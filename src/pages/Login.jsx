// LoginWithOtp.jsx
import React, { useState  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ add this
import { useAuth } from '../context/AuthContext'; // ✅ import AuthContext


const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = email step, 2 = OTP step
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
const { login } = useAuth(); // ⬅️ Add this inside the component

    const navigate = useNavigate(); // ✅ initialize

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/v1/send-otp', { email });
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
    const res = await axios.post('http://127.0.0.1:8000/api/v1/verify-otp', { email, otp });
    localStorage.setItem('auth_token', res.data.token);
    login(email); // ✅ Save email globally
    setMessage('✅ Logged in successfully!');
    setTimeout(() => navigate('/'), 1000);
  } catch (err) {
    setMessage(err.response?.data?.message || 'OTP verification failed');
  }
  setLoading(false);
};


  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center mb-3 text-primary">{step === 1 ? 'Login via Email' : 'Verify OTP'}</h4>

        {step === 1 ? (
          <>
            <div className="form-group mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setOtp(e.target.value)}
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
