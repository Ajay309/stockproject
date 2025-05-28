import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';

const PurchaseForm = ({ plan, onClose }) => {
  const { user } = useAuth(); // ✅ Correct usage of useAuth
  const { userEmail } = useAuth(); // ✅ Correct usage of useAuth
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');

  const handlePayment = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
  user_id: user?.id,
  plan: plan.name, // added this
  amount: plan.price,
  email: userEmail,
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
          name: user.name,
          email: user.email,
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
    }
  };

  return (
    <div className="purchase-form-modal mt-5 bg-white">
      <div className="purchase-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
        <h4>Purchase {plan.name} Plan</h4>
        <p>Email: <strong>{userEmail}</strong></p>
        
        <div className="mb-3">
          <label>Phone:</label>
          <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Coupon Code (optional):</label>
          <input className="form-control" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
        </div>

        <div className="d-flex gap-2">
          <button className="login bg-warning border-0" onClick={handlePayment}>Proceed to Pay ₹{plan.price}</button>
          <button className="login bg-warning border-0" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default PurchaseForm;
