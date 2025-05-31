import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Popup = () => {
  console.log('POPUP COMPONENT RENDERED'); // This should show immediately when component mounts

  const [isVisible, setIsVisible] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    console.log('POPUP EFFECT RUNNING'); // This should show when effect runs
    
    // Force show popup for testing
    const timer = setTimeout(() => {
      console.log('POPUP TIMER COMPLETED - SHOWING POPUP');
      setIsVisible(true);
    }, 7000);

    return () => {
      console.log('POPUP CLEANUP RUNNING');
      clearTimeout(timer);
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleClose = () => {
    console.log('POPUP CLOSING');
    setIsVisible(false);
  };

  console.log('POPUP VISIBILITY:', isVisible);

  if (!isVisible) {
    console.log('POPUP NOT VISIBLE - RETURNING NULL');
    return null;
  }

  console.log('POPUP RENDERING CONTENT');

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
        animation: 'slideIn 0.3s ease-out'
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
            color: '#666',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#333'}
          onMouseOut={(e) => e.target.style.color = '#666'}
        >
          <FaTimes />
        </button>

        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '24px',
            color: '#2c3e50',
            marginBottom: '10px',
            fontWeight: '600'
          }}>
            Welcome to StockProject!
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            Get started with our platform and discover the best investment opportunities.
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px'
        }}>
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
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(246, 180, 14, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e6a800';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(246, 180, 14, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#f6b40e';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(246, 180, 14, 0.3)';
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
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.color = '#333';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#666';
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