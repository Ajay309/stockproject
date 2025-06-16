import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getPopupImage } from '../../api';// import your function

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const image = await getPopupImage();
      if (image) {
        setImageUrl(image);
        setIsVisible(true);
      }
    }, 7000);

    return () => clearTimeout(timerId);
  }, []);

  const handleClose = () => setIsVisible(false);

  if (!isVisible || !imageUrl) return null;

  return (
    <div style={popupOverlayStyle}>
      <div style={popupBoxStyle}>
        <button onClick={handleClose} style={closeButtonStyle}><FaTimes /></button>

        <img
          src={imageUrl}
          alt="Popup"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={primaryButtonStyle} onClick={handleClose}>Get Started</button>
          <button style={secondaryButtonStyle} onClick={handleClose}>Maybe Later</button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

// 💡 Inline styles (you can extract them)
const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99999,
  animation: 'fadeIn 0.3s ease-in',
};

const popupBoxStyle = {
  background: 'white',
  padding: '30px',
  borderRadius: '12px',
  maxWidth: '500px',
  width: '90%',
  position: 'relative',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  animation: 'slideIn 0.3s ease-out',
  textAlign: 'center',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#666',
};

const primaryButtonStyle = {
  padding: '12px 25px',
  backgroundColor: '#f6b40e',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
};

const secondaryButtonStyle = {
  padding: '12px 25px',
  backgroundColor: 'transparent',
  color: '#666',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
};

export default Popup;
