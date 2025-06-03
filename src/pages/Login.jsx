import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            // Handle Google sign-in response
            handleGoogleLogin(response.credential);
          }
        }
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async (credential) => {
    setLoading(true);
    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/google-login', { token: credential });
      
      console.log('Google Login API response name:', res.data.name);

      // Store auth token
      localStorage.setItem('auth_token', res.data.token);
      
      // Generate initials for profile image
      const name = res.data.name || res.data.email.split('@')[0];
      const nameParts = name.trim().split(/\s+/);
      let initials;
      if (nameParts.length > 1) {
        initials = `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
      } else {
        // If only one part, use first two letters if available
        initials = nameParts[0].slice(0, 2).toUpperCase();
      }
      
      // Create user profile
      const userProfile = {
        email: res.data.email,
        name: res.data.name || res.data.email.split('@')[0],
        isLoggedIn: true,
        profileImage: res.data.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=f6b40e&color=fff&bold=true`
      };
      
      // Use AuthContext login function
      login(userProfile);
      
      setMessage('Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Google login failed');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/v1/login', {
        email,
        password
      });
      
      console.log('Login API response name:', res.data.name);

      // Store auth token
      localStorage.setItem('auth_token', res.data.token);
      
      // Generate initials for profile image
      const name = res.data.name || email.split('@')[0];
      const nameParts = name.trim().split(/\s+/);
      let initials;
      if (nameParts.length > 1) {
        initials = `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
      } else {
        // If only one part, use first two letters if available
        initials = nameParts[0].slice(0, 2).toUpperCase();
      }
      
      // Create user profile
      const userProfile = {
        email,
        name: res.data.name || email.split('@')[0],
        isLoggedIn: true,
        profileImage: res.data.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=f6b40e&color=fff&bold=true`
      };
      
      // Use AuthContext login function
      login(userProfile);
      
      setMessage('Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    paddingTop: '70px',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#222',
    textAlign: 'center',
    letterSpacing: '-1px',
  };

  const subheadingStyle = {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '24px',
    textAlign: 'center',
  };

  const formStyle = {
    width: '100%',
    maxWidth: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  };

  const labelStyle = {
    fontWeight: 600,
    color: '#444',
    fontSize: '0.95rem',
    marginBottom: 4,
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1.5px solid #ddd',
    borderRadius: '7px',
    fontSize: '1rem',
    marginBottom: '16px',
    marginTop: '2px',
  };

  const googleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 380,
    background: '#fff',
    border: '1.5px solid #ddd',
    borderRadius: '7px',
    padding: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    gap: '10px',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    margin: '16px 0',
  };

  const lineStyle = {
    flex: 1,
    height: '1.5px',
    background: '#eee',
  };

  const orStyle = {
    margin: '0 12px',
    color: '#888',
    fontWeight: 600,
    fontSize: '0.9rem',
  };

  const loginBtnStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    padding: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 8px rgba(246, 180, 14, 0.3)'
  };

  const signupTextStyle = {
    marginTop: 12,
    color: '#666',
    fontSize: '0.9rem',
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

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>Welcome Back</div>
      <div style={subheadingStyle}>Please login to your account</div>

      <button style={googleBtnStyle} onClick={handleGoogleSignIn}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 20, marginRight: 10 }} />
        Continue with Google
      </button>

      <div style={dividerStyle}>
        <div style={lineStyle}></div>
        <span style={orStyle}>or</span>
        <div style={lineStyle}></div>
      </div>

      <form onSubmit={handleLogin} style={formStyle}>
        <label style={labelStyle}>Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={inputStyle}
          required
        />

        <button
          type="submit"
          style={loginBtnStyle}
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
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>

      {message && <p style={{ color: '#888', marginTop: 8, fontSize: '0.9rem' }}>{message}</p>}

      <div style={signupTextStyle}>
        Don't have an account?{' '}
        <span
          style={linkStyle}
          onClick={() => navigate('/get-started')}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};

export default Login;
