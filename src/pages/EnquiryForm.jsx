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
    phone: '',
    enquiryType: '',
    message: '',
    preferredContact: '',
    agree: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('You must agree to the terms and privacy policy.');
      return;
    }
    setSubmitted(true);
    // Here you can add your API call or logic
  };

  if (submitted) {
    return (
      <div style={{ marginTop: 40, textAlign: 'center', color: '#28a745' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 500 }}>Thank you for your enquiry!</div>
        <div style={{ marginTop: 8, color: '#444' }}>We will get back to you soon.</div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 800,
      margin: '60px auto',
      padding: '0 20px',
      borderRadius: 16,
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      background: 'linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)',
      overflow: 'hidden',
    }}>
      <div style={{ 
        padding: '40px 40px 20px 40px', 
        textAlign: 'center', 
        background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)', 
        color: '#fff',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: '10px' }}>Enquiry Form</div>
        <div style={{ fontSize: 16, opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>Have a question or need help? Fill out the form below and our team will respond.</div>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '0 40px 40px 40px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
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
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            {/* <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
              <span style={iconStyle}></span>Phone Number <span style={{ color: '#888', fontSize: '0.85em' }}>(Optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="For urgent contact or WhatsApp"
              onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
              onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
            /> */}
          </div>
          <div>
            {/* <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
              <span style={iconStyle}></span>Type of Enquiry / Subject
            </label> */}
            {/* <select
              name="enquiryType"
              value={form.enquiryType}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box', background: '#fff' }}
              onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
              onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
            >
              <option value="">Select</option>
              {ENQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select> */}
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

        <div style={{ marginBottom: '20px' }}>
          {/* <label style={{ fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8 }}>
            <span style={iconStyle}></span>Preferred Contact Method <span style={{ color: '#888', fontSize: '0.85em' }}>(Optional)</span>
          </label> */}
          {/* <select
            name="preferredContact"
            value={form.preferredContact}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid #bcd0ee', fontSize: 16, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box', background: '#fff' }}
            onFocus={e => e.target.style.border = '1.5px solid #f6b40e'}
            onBlur={e => e.target.style.border = '1.5px solid #bcd0ee'}
          >
            <option value="">Select</option>
            {CONTACT_METHODS.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select> */}
        </div>

        <div style={{ 
          marginBottom: '25px', 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
            style={{ marginRight: 12, width: 20, height: 20 }}
          />
          <span style={{ fontSize: '0.97em', color: '#333' }}>
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#f6b40e', textDecoration: 'underline' }}>terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#f6b40e', textDecoration: 'underline' }}>privacy policy</a>.
          </span>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px 0',
            background: 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: 0.5,
            boxShadow: '0 2px 8px #f6b40e',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={e => {
            e.target.style.background = 'linear-gradient(90deg, #e6a800 0%, #e6c200 100%)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px #f6b40e';
          }}
          onMouseOut={e => {
            e.target.style.background = 'linear-gradient(90deg, #f6b40e 0%, #ffc107 100%)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px #f6b40e';
          }}
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
} 