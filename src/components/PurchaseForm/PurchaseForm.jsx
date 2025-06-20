import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PurchaseForm.css';


const PurchaseForm = ({ plan, onClose }) => {
  const { user, userEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [fixedAmount, setFixedAmount] = useState(0);
  const [isCouponValid, setIsCouponValid] = useState(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  const validateCoupon = async () => {
    if (!coupon) {
      setDiscount(0);
      setFixedAmount(0);
      setIsCouponValid(null);
      return;
    }

    setLoadingCoupon(true);
    try {
      const res = await fetch('http://dtc.sinfode.com/api/v1/coupon');
      const result = await res.json();

      const found = result.data.find(
        (c) =>
          c.code === coupon &&
          c.is_active === 1 &&
          new Date(c.expire_at) > new Date() &&
          (c.plan_id === plan.id || c.package_id === plan.package_id)
      );

      if (found) {
        setIsCouponValid(true);
        setDiscount(found.discount || 0);
        setFixedAmount(parseFloat(found.fixed_amount) || 0);
      } else {
        setIsCouponValid(false);
        setDiscount(0);
        setFixedAmount(0);
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setIsCouponValid(false);
      setDiscount(0);
      setFixedAmount(0);
    } finally {
      setLoadingCoupon(false);
    }
  };

  const calculateDiscountedPrice = () => {
    if (fixedAmount > 0) {
      return Math.max(0, plan.price - fixedAmount);
    } else {
      return Math.max(0, plan.price - (plan.price * discount) / 100);
    }
  };

  const handlePayment = async () => {
    if (!email || !phone) {
      alert('❗ Email and phone are required.');
      return;
    }

    try {
      const res = await fetch('https://dtc.sinfode.com/api/v1/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userId,
          plan: plan.name,
          amount: calculateDiscountedPrice(),
          email,
          phone,
          coupon: coupon?.trim() || 'NO_COUPON',
        }),
      });

      const responseText = await res.text();
      console.log('Raw response from create-order:', responseText);

      const data = JSON.parse(responseText);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Company Name',
        description: plan.name,
        order_id: data.order_id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch('https://dtc.sinfode.com/api/v1/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              await fetch('https://dtc.sinfode.com/api/v1/payment-success', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  user_id: userId,
                  email,
                  phone,
                  plan: plan.name,
                  amount: calculateDiscountedPrice(),
                  coupon,
                }),
              });

              alert('✅ Payment Verified and Successful!');

              navigate('/profile', {
                state: {
                  userId: userId,
                  payment: {
                    plan: plan.name,
                    amount: calculateDiscountedPrice(),
                    email,
                    phone,
                    coupon,
                  }
                }
              });
            } else {
              alert('❌ Invalid payment signature.');
              console.error('❌ Verification failed:', verifyData.message);
            }
          } catch (err) {
            console.error('❌ Payment verification failed:', err);
            alert('❌ Payment verification failed.');
          }
        },
        prefill: {
          name: user?.name || '',
          email,
          contact: phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('❌ Payment failed. Please try again.');
    }
  };

  return (
    <div className="purchase-form-modal mt-5 py-5 bg-white">
      <div className="purchase-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <h4>Purchase {plan.name} Plan</h4>

              <div className="mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Phone:</label>
                <input
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Coupon Code (optional):</label>
                <div className="d-flex">
                  <input
                    className="form-control"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setIsCouponValid(null);
                    }}
                    placeholder="Enter coupon code"
                  />
                  <button
                    type="button"
                    className="login bg-warning rounded border-0 ms-2"
                    onClick={validateCoupon}
                    disabled={loadingCoupon}
                    style={{ height: 51 }}
                  >
                    {loadingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {isCouponValid === true && (
                  <small className="text-success">
                    ✅ Coupon applied! {fixedAmount > 0 ? `₹${fixedAmount} off` : `${discount}% off`}
                  </small>
                )}
                {isCouponValid === false && (
                  <small className="text-danger">
                    ❌ Invalid, expired, or not applicable for this plan
                  </small>
                )}
              </div>

              <div className="mb-3">
                <strong>
                  Total Payable:{' '}
                  ₹{calculateDiscountedPrice()}
                </strong>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="login bg-warning border-0"
                  onClick={handlePayment}
                >
                  Proceed to Pay ₹{calculateDiscountedPrice()}
                </button>
                <button className="login bg-warning border-0" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
