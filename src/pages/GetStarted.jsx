import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './GetStarted.css';

const GetStarted = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '49001026194-7fj7o57v1ag5i6i24ncmpma8semjiikk.apps.googleusercontent.com',
        callback: (response) => {
          if (response.credential) {
            console.log('Google sign-in successful, token:', response.credential);
            // axios.post('/api/auth/google', { token: response.credential })
            //   .then(res => navigate('/dashboard'));
          }
        }
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large', width: 300 }
      );

      setGoogleReady(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/send-otp', { email });
      if (res.data.already_registered) {
        setMessage('Email already registered. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(res.data.message);
        setStep(2);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://dtc.sinfode.com/api/v1/verify-otp', { email, otp });
      setMessage('OTP verified successfully!');
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setMessage('Please enter a valid name');
      return;
    }
    setStep(4);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/verify-otp', {
        email,
        name,
        password,
        otp
      });

      localStorage.setItem('auth_token', res.data.token);

      const nameParts = name.trim().split(/\s+/);
      let initials;
      if (nameParts.length > 1) {
        initials = `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
      } else {
        initials = nameParts[0].slice(0, 2).toUpperCase();
      }

      const userProfile = {
        email,
        name: name || email.split('@')[0],
        isLoggedIn: true,
        profileImage: res.data.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=f6b40e&color=fff&bold=true`
      };

      login(userProfile);

      setMessage('Account created successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="get-started-container">
      <div className="get-started-heading">Welcome to DTC Club</div>
      <div className="get-started-subheading">To get started, please sign up</div>

      {/* ✅ Google Sign-In Button container */}
      <div id="google-signin-button" style={{ marginBottom: '1rem' }}></div>

      <div className="divider">
        <div className="line"></div>
        <span className="or">or</span>
        <div className="line"></div>
      </div>

      <form onSubmit={
        step === 1 ? handleSendOtp :
        step === 2 ? handleVerifyOtp :
        step === 3 ? handleNameSubmit :
        handlePasswordSubmit
      } className="get-started-form">
        <label className="form-label">
          {step === 1 ? 'Email address' :
           step === 2 ? 'Enter OTP sent to your email' :
           step === 3 ? 'Enter your name' :
           'Create a password'}
        </label>

        {step === 1 ? (
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-input"
            required
          />
        ) : step === 2 ? (
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="form-input"
            required
          />
        ) : step === 3 ? (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
            className="form-input"
            required
          />
        ) : (
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a strong password"
            className="form-input"
            required
            minLength="6"
          />
        )}

        <button
          type="submit"
          className="continue-btn"
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
          {loading ? 'Please wait...' :
           step === 1 ? 'Continue' :
           step === 2 ? 'Verify OTP' :
           step === 3 ? 'Next' :
           'Create Account'}
        </button>
      </form>

      {message && <p style={{ color: '#888', marginTop: 10 }}>{message}</p>}

      <div className="login-text">
        Already have an account?{' '}
        <span
          className="link"
          onClick={() => navigate('/login')}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Log in
        </span>
      </div>

      <div className="get-started-footer">
        <span className="link">Support</span> •
        <span className="link">Privacy</span> •
        <span className="link">Terms</span>
      </div>
    </div>
  );
};

export default GetStarted;
