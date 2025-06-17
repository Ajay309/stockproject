import React, { useState } from 'react';

const ENQUIRY_TYPES = [
  'Stock Information',
  'Investment Advice',
  'Account Support',
  'Technical Issues',
  'General Question'
];

const CONTACT_METHODS = [
  'Email',
  'Phone',
  'WhatsApp'
];

const iconStyle = {
  marginRight: 8,
  color: '#f6b40e',
  fontSize: '1.1em',
  verticalAlign: 'middle'
};

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: '',
    agree: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('You must agree to the terms and privacy policy.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dtc.sinfode.com/api/v1/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
          message: form.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone_number: '',
        message: '',
        agree: false
      });
    } catch (err) {
      setError(err.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div  id="enquiry-form" style={{
        maxWidth: 1150,
        margin: '60px auto',
        padding: '40px 20px',
        borderRadius: '0',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        background: 'linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)',
        textAlign: 'center'
      }}>
        <div style={{ 
          padding: '40px 20px 20px 20px', 
          textAlign: 'center', 
          background: '#f6b40e', 
          color: '#fff',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: '10px' }}>Thank You!</div>
          <div style={{ fontSize: 16, opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>Your enquiry has been received. We will get back to you soon.</div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            margin: '0 auto 20px',
            background: '#f6b40e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <i className="bi bi-check-lg" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>We appreciate your interest in our services.</p>
          <button 
            onClick={() => setSubmitted(false)}
            style={{
              padding: '12px 30px',
              background: '#f6b40e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.target.style.background = '#e6a800';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px #f6b40e';
            }}
            onMouseOut={e => {
              e.target.style.background = '#f6b40e';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Send Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="enquiry-form" style={{
      maxWidth: 1150,
      margin: '60px auto',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      background: 'linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)',
      overflow: 'hidden',
    }}>
      <div style={{ 
        padding: '40px 20px 20px 20px', 
        textAlign: 'center', 
        background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)', 
        color: '#rgb(255, 255, 255, 0.9)',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: '10px' }}>Enquiry Form</div>
        <div style={{ fontSize: 16, opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>Have a question or need help? Fill out the form below and our team will respond.</div>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '0 20px 40px 20px' }}>
        {error && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '20px', 
            backgroundColor: '#fee2e2', 
            border: '1px solid #ef4444',
            borderRadius: '6px',
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
              <span style={iconStyle}></span>Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="Your Name"
              onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
              onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
              <span style={iconStyle}></span>Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="you@email.com"
              onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
              onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
              <span style={iconStyle}></span>Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="Your Phone Number"
              onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
              onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
            <span style={iconStyle}></span>Message / Details
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box', resize: 'vertical' }}
            placeholder="Let us know your question or issue."
            onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
            onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
          />
        </div>

        <div style={{ 
          marginBottom: '25px', 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          flexWrap: 'wrap'
        }}>
          {/* <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
            style={{ marginRight: 12, width: 20, height: 20 }}
          /> */}
          {/* <span style={{ fontSize: '0.97em', color: '#333' }}>
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#f6b40e', textDecoration: 'underline' }}>terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#f6b40e', textDecoration: 'underline' }}>privacy policy</a>.
          </span> */}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px 0',
            background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)',
            color: '#rgb(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: 0.5,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.3s ease',
          }}
          onMouseOver={e => {
            if (!loading) {
              e.target.style.background = 'linear-gradient(90deg, #e6a800 0%, #e6c200 100%)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px #f6b40e';
            }
          }}
          onMouseOut={e => {
            if (!loading) {
              e.target.style.background = 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px #f6b40e';
            }
          }}
        >
          {loading ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  );
} 