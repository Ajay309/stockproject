import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useOfferTimer } from '../../context/OfferTimerContext';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { endTime, isLoading: timerLoading, error: timerError } = useOfferTimer();

  console.log('Timer.jsx - Context values:', { endTime, timerLoading, timerError });

  useEffect(() => {
    let timerId; // Use a local variable for the timer ID

    if (endTime) {
      timerId = setInterval(() => {
        const now = new Date();
        const difference = endTime - now;

        if (difference <= 0) {
          clearInterval(timerId);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        }
      }, 1000);
    }

    return () => { // Cleanup function
       console.log('Clearing plans timer interval:', timerId);
       clearInterval(timerId); // Clear using local variable in cleanup
    };
  }, [endTime]); // Rerun timer effect if endTime from context changes

   if (timerLoading) return <div className="text-center">Loading timer...</div>;
   if (timerError) return <div className="text-red-500 text-center">Error loading timer.</div>;
   // Optionally, hide if endTime is null after loading
   if (!endTime) return null;

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