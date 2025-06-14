// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/forgot-password', { email }); // Adjust endpoint as per your backend
      setMessage(res.data.message || 'Password reset link sent to your email.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 10 }}>Forgot Password</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.95rem' }}>
        Enter your email address to receive a reset link.
      </p>
      <form onSubmit={handleForgotPassword}>
        <label style={{ fontWeight: 600, marginBottom: 5 }}>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1.5px solid #ddd',
            borderRadius: '6px',
            fontSize: '1rem',
            marginBottom: '16px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#f6b40e',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p style={{ marginTop: 12, color: '#555', fontSize: '0.95rem' }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
