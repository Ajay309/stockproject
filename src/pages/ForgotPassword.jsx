// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/forgot-password', { email });
      setMessage(res.data.message || 'Password reset link sent to your email.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fff',
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      paddingTop: '100px'
    }}>
      
        <h2 style={{
          textAlign: 'center',
          marginBottom: '16px',
          fontSize: '2rem',
          fontWeight: 700,
          color: '#222',
          letterSpacing: '-0.5px',
          width: '100%',
          maxWidth: '420px'
        }}>
          Forgot Password
        </h2>
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '0.95rem',
          marginBottom: '24px',
          lineHeight: '1.5',
          width: '100%',
          maxWidth: '420px'
        }}>
          Enter your email address to receive a reset link.
        </p>

        <form onSubmit={handleForgotPassword} style={{
          width: '100%',
          maxWidth: '420px',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#444',
              fontSize: '0.95rem',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1.5px solid #ddd',
                borderRadius: '7px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
              onBlur={e => e.target.style.border = '1.5px solid #ddd'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)',
              border: 'none',
              borderRadius: '7px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(246, 180, 14, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #e6a800 0%, #e6c200 100%)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(246, 180, 14, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(246, 180, 14, 0.3)';
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: message.includes('sent') ? '#f0fdf4' : '#fee2e2',
            border: `1px solid ${message.includes('sent') ? '#86efac' : '#fecaca'}`,
            borderRadius: '6px',
            color: message.includes('sent') ? '#166534' : '#dc2626',
            fontSize: '0.95rem',
            textAlign: 'center',
            maxWidth: '420px',
            width: '100%'
          }}>
            {message}
          </p>
        )}

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem',
          maxWidth: '420px',
          width: '100%'
        }}>
          Remember your password?{' '}
          <span
            style={{
              color: '#f6b40e',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onClick={() => navigate('/login')}
            onMouseOver={(e) => e.target.style.color = '#e6a800'}
            onMouseOut={(e) => e.target.style.color = '#f6b40e'}
          >
            Back to Login
          </span>
        </div>
      
    </div>
  );
};

export default ForgotPassword;
