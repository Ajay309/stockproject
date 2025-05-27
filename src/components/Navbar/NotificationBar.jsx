import React, { useEffect, useState } from 'react';
import axios from 'axios';

const notificationBarStyle = {
  width: '100%',
  background: '#fffae6',
  color: '#000000',
  padding: '8px 0',
  textAlign: 'center',
  fontSize: '0.95rem',
  borderBottom: '1px solid #ffeeba',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1051, // just above the navbar
};

export default function NotificationBar() {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/notification')
      .then(response => {
        console.log(response.data.data);
        setNotification(response.data.data); // assuming API returns { data: [...] }
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);


  if (!notification) return null; // Hide if empty

 return (
    <div style={notificationBarStyle}>
      {notification.map((note, index) => (
        <span key={note.id || index} className="mx-2">
          {note.name}
        </span>
      ))}
    </div>
  );
}
