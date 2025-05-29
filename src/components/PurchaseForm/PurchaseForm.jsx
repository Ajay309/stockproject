import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PurchaseForm = ({ plan, onClose }) => {
  const { user, userEmail } = useAuth();
  const [email, setEmail] = useState(userEmail || '');
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

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
          user_id: user?.id || null, // Optional
          plan: plan.name,
          amount: plan.price,
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
                <input
                  className="form-control"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="login bg-warning border-0"
                  onClick={handlePayment}
                >
                  Proceed to Pay ₹{plan.price}
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
