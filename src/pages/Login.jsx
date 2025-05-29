import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();
const handleLogin = async () => {
    try {
      const response = await axios.post('https://dtc.sinfode.com/api/v1/login', {
        email,
        password
      });

      // Save token and user if needed
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert('Login successful!');
    } catch (error) {
      console.error(error.response.data);
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/send-otp', { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/send-otp', { email, otp });
      localStorage.setItem('auth_token', res.data.token);
      login(email);
      setMessage('✅ Logged in successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa', // light background
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
        }}
      >
        <h4 className="text-center mb-3 text-primary">
          {step === 1 ? 'Login via Email' : 'Verify OTP'}
        </h4>

        {step === 1 ? (
          <>
            <div className="form-group mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <div className="form-group mb-3">
              <label>Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success w-100"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP & Login'}
            </button>
            <div className="text-center mt-3">
              <button className="btn btn-link p-0" onClick={() => setStep(1)}>
                ← Change Email
              </button>
            </div>
          </>
        )}

        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
