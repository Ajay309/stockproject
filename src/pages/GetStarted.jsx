import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: '',
    contactType: 'email',
    acceptTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions to continue');
      return;
    }
    console.log('Form submitted:', formData);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    position: 'relative',
    top: '60px'
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
    fontSize: '1.8rem'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyle = {
    fontSize: '0.9rem',
    color: '#555',
    fontWeight: '500'
  };

  const inputStyle = {
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem',
    fontWeight: '500'
  };

  const loginLinkStyle = {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#666',
    fontSize: '0.9rem'
  };

  const spanStyle = {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: '500'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
  };

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  };

  const checkboxLabelStyle = {
    fontSize: '0.9rem',
    color: '#555',
    cursor: 'pointer'
  };

  const termsLinkStyle = {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Contact Type</label>
            <select 
              name="contactType" 
              value={formData.contactType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>
              {formData.contactType === 'email' ? 'Email' : 'WhatsApp Number'}
            </label>
            <input
              type={formData.contactType === 'email' ? 'email' : 'tel'}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder={formData.contactType === 'email' ? 'Enter your email' : 'Enter your WhatsApp number'}
              style={inputStyle}
            />
          </div>

          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              style={checkboxStyle}
              required
            />
            <label htmlFor="acceptTerms" style={checkboxLabelStyle}>
              I accept the <span style={termsLinkStyle} onClick={() => window.open('/terms', '_blank')}>Terms and Conditions</span>
            </label>
          </div>
          
          <button type="submit" style={buttonStyle}>Continue</button>
        </form>
        
        <p style={loginLinkStyle}>
          Already have an account? <span onClick={() => navigate('/login')} style={spanStyle}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;