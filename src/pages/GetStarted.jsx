import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    // Handle sign up logic here
    console.log('Email submitted:', email);
  };

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>Welcome to Stock App</div>
      <div style={subheadingStyle}>To get started, please sign up</div>
      <button style={googleBtnStyle} onClick={handleGoogleSignIn}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{width: 26, marginRight: 12}} />
        Continue with Google
      </button>
      <div style={dividerStyle}>
        <div style={lineStyle}></div>
        <span style={orStyle}>or</span>
        <div style={lineStyle}></div>
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="email" style={labelStyle}>Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={inputStyle}
          required
        />
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
          Continue
        </button>
      </form>
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
        </span>•
        <span 
          style={linkStyle}
          onMouseOver={(e) => e.target.style.color = '#e6a800'}
          onMouseOut={(e) => e.target.style.color = '#f6b40e'}
        >
          Privacy
        </span>•
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