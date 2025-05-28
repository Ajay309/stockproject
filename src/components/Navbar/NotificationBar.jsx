import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get('https://dtc.sinfode.com/api/v1/notification')
      .then(response => {
        const data = response.data.data;

        // Check if it's an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
          setNotification(data[0].name); // show first notification
        } else if (typeof data === 'object' && data !== null) {
          setNotification(data.name); // if it's a single object
        }
      })
      .catch(error => {
        console.error('Error fetching notification:', error);
      });
  }, []);

  if (!notification) return null; // Hide bar if empty

  return (
    <div style={notificationBarStyle}>
      <span>{notification}</span>
    </div>
  );
}
