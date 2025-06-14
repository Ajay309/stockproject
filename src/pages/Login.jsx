import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(function (c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
            );
            const profile = JSON.parse(jsonPayload);
            const userProfile = {
              email: profile.email,
              name: profile.name || profile.email.split('@')[0],
              isLoggedIn: true,
              profileImage:
                profile.picture ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.name || profile.email.split('@')[0]
                )}&background=f6b40e&color=fff&bold=true`,
            };
            login(userProfile);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            localStorage.setItem('auth_token', response.credential);
            navigate('/');
          }
        },
      });

      window.google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
        theme: 'outline',
        size: 'large',
        width: 360,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [login, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('https://dtc.sinfode.com/api/v1/login', {
        email,
        password,
      });

      const userProfile = {
        email: res.data.user.email,
        name: res.data.user.name || res.data.user.email.split('@')[0],
        isLoggedIn: true,
        profileImage:
          res.data.user.profile_image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            res.data.user.name || res.data.user.email.split('@')[0]
          )}&background=f6b40e&color=fff&bold=true`,
      };

      login(userProfile);
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('auth_token', res.data.token);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        paddingTop: '110px',
      }}
      
    >
      <div
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#222',
          textAlign: 'center',
          letterSpacing: '-1px',
        }}
      >
        Welcome Back
      </div>
      <div
        style={{
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Please login to your account
      </div>

      <div id="google-signin-button" style={{ marginBottom: '32px' }}></div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '420px',
          margin: '24px 0',
        }}
      >
        <div style={{ flex: 1, height: '1.5px', background: '#eee' }}></div>
        <span
          style={{
            margin: '0 18px',
            color: '#888',
            fontWeight: '600',
            fontSize: '1.1rem',
          }}
        >
          or
        </span>
        <div style={{ flex: 1, height: '1.5px', background: '#eee' }}></div>
      </div>

      <form
        onSubmit={handleLogin}
        style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 600,
              color: '#444',
              fontSize: '0.95rem',
              marginBottom: '8px',
            }}
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1.5px solid #ddd',
              borderRadius: '7px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.border = '1.5px solid #f6b40e')}
            onBlur={(e) => (e.target.style.border = '1.5px solid #ddd')}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 600,
              color: '#444',
              fontSize: '0.95rem',
              marginBottom: '8px',
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1.5px solid #ddd',
              borderRadius: '7px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.border = '1.5px solid #f6b40e')}
            onBlur={(e) => (e.target.style.border = '1.5px solid #ddd')}
            required
          />
        </div>

        <button
          type="submit"
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
            boxShadow: '0 2px 8px rgba(246, 180, 14, 0.3)',
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
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '0.95rem',
            textAlign: 'center',
            maxWidth: '420px',
            width: '100%',
          }}
        >
          {message}
        </p>
      )}

      <div
        style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        Don't have an account?{' '}
        <span
          style={{
            color: '#f6b40e',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onClick={() => navigate('/get-started')}
          onMouseOver={(e) => (e.target.style.color = '#e6a800')}
          onMouseOut={(e) => (e.target.style.color = '#f6b40e')}
        >
          Sign up
        </span>
      </div>

      <div
        style={{
          marginTop: '16px',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <span
          style={{
            fontSize: '0.9rem',
            color: '#f6b40e',
            cursor: 'pointer',
            textDecoration: 'underline',
            transition: 'color 0.2s ease',
          }}
          onClick={() => navigate('/forgot-password')}
          onMouseOver={(e) => (e.target.style.color = '#e6a800')}
          onMouseOut={(e) => (e.target.style.color = '#f6b40e')}
        >
          Forgot Password?
        </span>
      </div>
    </div>
  );
};

export default Login;
