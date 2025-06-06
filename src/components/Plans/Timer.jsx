import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationOnlyBar from './NotificationOnlyBar'; // Import the notification bar component

const Timer = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fetch the timer date from the API
  useEffect(() => {
    axios.get('https://dtc.sinfode.com/api/v1/offertimer')
      .then((res) => {
        const offerData = res.data?.data?.[0];
        if (offerData?.end_time) {
          // Convert string to Date object
          const formattedDate = new Date(offerData.end_time.replace(' ', 'T'));
          setTargetDate(formattedDate);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch offer timer:', err);
      });
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
      <NotificationOnlyBar message="Hurry up! Offer ends soon!" />
      <div className="d-flex justify-content-center gap-4">
        <div className="timer-box">
          <div className="timer-value" style={{ color: '#fbba07' }}>{timeLeft.days}</div>
          <div className="timer-label">Days</div>
        </div>
        <div className="timer-box">
          <div className="timer-value" style={{ color: '#fbba07' }}>{timeLeft.hours}</div>
          <div className="timer-label">Hours</div>
        </div>
        <div className="timer-box">
          <div className="timer-value" style={{ color: '#fbba07' }}>{timeLeft.minutes}</div>
          <div className="timer-label">Minutes</div>
        </div>
        <div className="timer-box">
          <div className="timer-value" style={{ color: '#fbba07' }}>{timeLeft.seconds}</div>
          <div className="timer-label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
