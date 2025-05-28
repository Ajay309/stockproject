import React from 'react';

const notificationBarStyle = {
  width: '100%',
  background: '#fffae6',
  color: '#856404',
  padding: '8px 0',
  textAlign: 'center',
  fontSize: '0.95rem',
  borderBottom: '1px solid #ffeeba',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1051 // just above the navbar
};

export default function NotificationBar() {
  return (
    <div style={notificationBarStyle}>
      <span>🔔 Welcome! Check out our latest updates and offers.</span>
    </div>
  );
} 