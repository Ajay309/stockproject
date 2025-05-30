import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const GetStarted = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Enter name, 4: Enter password
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const googleCallback = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '181209510379-er7p6372agi93lnj2s186ilhofpplk36.apps.googleusercontent.com',
        callback: (response) => {
          if (response.credential) {
            console.log('Google sign-in successful, token:', response.credential);
            // axios.post('/api/auth/google', { token: response.credential })
            //   .then(res => navigate('/dashboard'));
          }
        }
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    }
  };

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
      const res = await axios.post('https://dtc.sinfode.com/api/v1/verify-otp', { email, otp });
      setMessage(' OTP verified successfully!');
      setStep(3); // Move to name input step
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setMessage('Please enter a valid name');
      return;
    }
    setStep(4); // Move to password step
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('GetStarted - Name state before submission:', name);
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/verify-otp', {
        email,
        name,
        password,
        otp
      });
      
      // Store auth token
      localStorage.setItem('auth_token', res.data.token);
      
      // Generate initials for profile image
      const nameParts = name.trim().split(/\s+/);
      let initials;
      if (nameParts.length > 1) {
        initials = `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
      } else {
        // If only one part, use first two letters if available
        initials = nameParts[0].slice(0, 2).toUpperCase();
      }
      
      // Create user profile with profile image
      const userProfile = {
        email,
        name: name || email.split('@')[0], // Use email prefix as fallback
        isLoggedIn: true,
        profileImage: res.data.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=f6b40e&color=fff&bold=true`
      };
      
      // Use AuthContext login function
      login(userProfile);
      
      setMessage('Account created successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff',
    width: '100vw',
    padding: 0,
    paddingTop: '105px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#222',
    textAlign: 'center',
    letterSpacing: '-1px',
  };

  const subheadingStyle = {
    color: '#666',
    fontSize: '1.3rem',
    marginBottom: '36px',
    textAlign: 'center',
  };

  const googleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 420,
    background: '#fff',
    border: '1.5px solid #ddd',
    borderRadius: '7px',
    padding: '18px',
    fontSize: '1.15rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '28px',
    transition: 'box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    gap: '12px',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    margin: '24px 0',
  };

  const lineStyle = {
    flex: 1,
    height: '1.5px',
    background: '#eee',
  };

  const orStyle = {
    margin: '0 18px',
    color: '#888',
    fontWeight: 600,
    fontSize: '1.1rem',
  };

  const formStyle = {
    width: '100%',
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  };

  const labelStyle = {
    fontWeight: 600,
    color: '#444',
    fontSize: '1.05rem',
    marginBottom: 6,
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    border: '1.5px solid #ddd',
    borderRadius: '7px',
    fontSize: '1.1rem',
    marginBottom: '22px',
    marginTop: '4px',
  };

  const continueBtnStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    padding: '16px',
    fontSize: '1.15rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    marginBottom: '18px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 8px rgba(246, 180, 14, 0.3)'
  };

  const loginTextStyle = {
    marginTop: 18,
    color: '#666',
    fontSize: '1.05rem',
    textAlign: 'center',
  };

  const linkStyle = {
    color: '#f6b40e',
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '0 4px',
    fontWeight: 500,
    transition: 'color 0.2s ease'
  };

  const footerStyle = {
    marginTop: '48px',
    textAlign: 'center',
    color: '#888',
    fontSize: '1rem',
    width: '100%',
  };

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>Welcome to Stock App</div>
      <div style={subheadingStyle}>To get started, please sign up</div>

      <button style={googleBtnStyle} onClick={handleGoogleSignIn}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 26, marginRight: 12 }} />
        Continue with Google
      </button>

      <div style={dividerStyle}>
        <div style={lineStyle}></div>
        <span style={orStyle}>or</span>
        <div style={lineStyle}></div>
      </div>

      <form onSubmit={
        step === 1 ? handleSendOtp :
        step === 2 ? handleVerifyOtp :
        step === 3 ? handleNameSubmit :
        handlePasswordSubmit
      } style={formStyle}>
        <label style={labelStyle}>
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
            style={inputStyle}
            required
          />
        ) : step === 2 ? (
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={inputStyle}
            required
          />
        ) : step === 3 ? (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
            style={inputStyle}
            required
          />
        ) : (
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a strong password"
            style={inputStyle}
            required
            minLength="6"
          />
        )}

        <button
          type="submit"
          style={continueBtnStyle}
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

      <div style={loginTextStyle}>
        Already have an account?{' '}
        <span
          style={linkStyle}
          onClick={() => navigate('/login')}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Log in
        </span>
      </div>

      <div style={footerStyle}>
        <span
          style={linkStyle}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Support
        </span> •
        <span
          style={linkStyle}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Privacy
        </span> •
        <span
          style={linkStyle}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Terms
        </span>
      </div>
    </div>
  );
};

export default GetStarted;