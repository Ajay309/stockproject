// src/components/NotificationBar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotificationMessage } from '../../api';
import { useOfferTimer } from '../../context/OfferTimerContext';

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
  zIndex: 12000,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '18px',
};

export default function NotificationBar() {
  const [notification, setNotification] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();
  const { endTime, isLoading: timerLoading, error: timerError } = useOfferTimer();

  useEffect(() => {
    (async () => {
      const message = await getNotificationMessage();
      setNotification(message);
    })();
  }, []);

  useEffect(() => {
    if (notification && !timerLoading && !timerError) {
      document.body.classList.add('has-notification-bar');
    } else {
      document.body.classList.remove('has-notification-bar');
    }
  }, [notification, timerLoading, timerError]);

  useEffect(() => {
    let timerId;

    if (endTime) {
      timerId = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
          clearInterval(timerId);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        }
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [endTime]);

  if (!notification || timerLoading || timerError) return null;

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .notification-bar-responsive {
            font-size: 0.85rem !important;
            padding: 6px 2px !important;
            flex-direction: column !important;
            gap: 4px !important;
            text-align: center !important;
          }
          .notification-bar-timer {
            font-size: 0.95rem !important;
            gap: 4px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <div
        style={notificationBarStyle}
        className="notification-bar-responsive"
        onClick={() => navigate('/plans')}
        title="Go to Plans"
      >
        <span>{notification}</span>
        <span
          className="notification-bar-timer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 600,
            color: '#fbba07',
            fontSize: '1.05rem',
          }}
        >
          <span style={{ color: '#856404' }}>Offer ends in:</span>
          <span>{timeLeft.days}d</span>:
          <span>{timeLeft.hours}h</span>:
          <span>{timeLeft.minutes}m</span>:
          <span>{timeLeft.seconds}s</span>
        </span>
      </div>
    </>
  );
}
