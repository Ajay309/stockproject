import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set the target date (e.g., 7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer-section text-center py-4">
      <h3 className="timer-heading">Limited Time Offer</h3>
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