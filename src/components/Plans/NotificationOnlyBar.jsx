// src/components/NotificationOnlyBar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotificationMessage } from '../../api';

export default function NotificationOnlyBar() {
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const message = await getNotificationMessage();
      setNotification(message);
    })();
  }, []);

  if (!notification) return null;

  return (
    <>
      <style>{`
        .notification-bar {
          width: 100%;
          background: linear-gradient(90deg, #fff3cd, #ffeeba);
          color: #5c3900;
          padding: 10px 16px;
          font-size: 1rem;
          border-radius: 4px;
          margin: 16px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
          font-weight: 500;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .notification-bar:hover {
          background: linear-gradient(90deg, #ffe8a1, #ffdd7c);
          transform: scale(1.01);
        }

        .notification-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 600px) {
          .notification-bar {
            font-size: 0.9rem;
            padding: 8px 12px;
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div
        className="notification-bar"
        onClick={() => navigate('/plans')}
        title="Go to Plans"
      >
        <span className="notification-icon">📢</span>
        <span>{notification}</span>
      </div>
    </>
  );
}
