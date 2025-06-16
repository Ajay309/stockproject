import React, { useState, useEffect } from 'react';
import NotificationOnlyBar from './NotificationOnlyBar';
import { getOfferEndTime } from '../../api';

const Timer = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch offer end date
  useEffect(() => {
    (async () => {
      const endTime = await getOfferEndTime();
      if (endTime) setTargetDate(endTime);
    })();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="timer-section text-center py-4">
      <h3 className="timer-heading">Limited Time Offer</h3>
      <NotificationOnlyBar message="Hurry up! Offer ends soon!" className="text-warning" />
      <div className="d-flex justify-content-center gap-4">
        {['days', 'hours', 'minutes', 'seconds'].map((label) => (
          <div className="timer-box" key={label}>
            <div className="timer-value" style={{ color: '#fbba07' }}>
              {timeLeft[label]}
            </div>
            <div className="timer-label">{label.charAt(0).toUpperCase() + label.slice(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
