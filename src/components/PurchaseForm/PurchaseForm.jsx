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
  const [isCouponValid, setIsCouponValid] = useState(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const navigate = useNavigate();

  const validateCoupon = async () => {
    if (!coupon) return;

    setLoadingCoupon(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/coupon');
      const result = await res.json();

      const found = result.data.find(
        (c) =>
          c.code === coupon &&
          c.is_active === 1 &&
          new Date(c.expire_at) > new Date()
      );

      if (found) {
        setDiscount(found.discount);
        setIsCouponValid(true);
      } else {
        setDiscount(0);
        setIsCouponValid(false);
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setDiscount(0);
      setIsCouponValid(false);
    } finally {
      setLoadingCoupon(false);
    }
  };

  const calculateDiscountedPrice = () => {
    return plan.price - (plan.price * discount) / 100;
  };

  const handlePayment = async () => {
    if (!email || !phone) {
      alert('❗ Email and phone are required.');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id || null,
          plan: plan.name,
          amount: calculateDiscountedPrice(),
          email,
          phone,
          coupon,
        }),
      });
      const data = await res.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Company Name',
        description: plan.name,
        order_id: data.order_id,
        handler: function (response) {
          alert(`✅ Payment Successful! Razorpay ID: ${response.razorpay_payment_id}`);
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
                    style={{height:51}}
                  >
                    {loadingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {isCouponValid === true && (
                  <small className="text-success">
                    ✅ Coupon applied! {discount}% off
                  </small>
                )}
                {isCouponValid === false && (
                  <small className="text-danger">
                    ❌ Invalid or expired coupon
                  </small>
                )}
              </div>

              <div className="mb-3">
                <strong>Total Payable: ₹{calculateDiscountedPrice()}</strong>
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
