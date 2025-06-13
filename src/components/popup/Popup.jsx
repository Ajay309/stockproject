import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    let timerId;
    // Fetch image from API
    axios.get('https://dtc.sinfode.com/api/v1/popup')
      .then((res) => {
        const data = res.data?.data;
        if (data && data.length > 0 && data[0].image) {
          setImageUrl(`${data[0].image}`);
          setHasContent(true); // Indicate that content is available
        } else {
          setHasContent(false); // No content available
        }
      })
      .catch((err) => {
        console.error('Error fetching popup image:', err);
        setHasContent(false); // Treat error as no content
      });

    // Only set timer to show popup if content is fetched
    timerId = setTimeout(() => {
      setIsVisible(true);
    }, 7000);

    return () => clearTimeout(timerId);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || !hasContent) return null; // Hide if not visible or no content

  return (
    <div style={{
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
      animation: 'fadeIn 0.3s ease-in'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        animation: 'slideIn 0.3s ease-out',
        textAlign: 'center'
      }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          <FaTimes />
        </button>

        

        {/* Show Image from API */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Popup"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              marginBottom: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
            }}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={handleClose}
            style={{
              padding: '12px 25px',
              backgroundColor: '#f6b40e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Get Started
          </button>
          <button
            onClick={handleClose}
            style={{
              padding: '12px 25px',
              backgroundColor: 'transparent',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Maybe Later
          </button>
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

export default Popup;
