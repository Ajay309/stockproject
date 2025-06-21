import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOfferTimer } from '../api'; // ✅ correct relative path


const OfferTimerContext = createContext(null);

export const useOfferTimer = () => {
  const context = useContext(OfferTimerContext);
  if (!context) {
    throw new Error('useOfferTimer must be used within an OfferTimerProvider');
  }
  return context;
};

export const OfferTimerProvider = ({ children }) => {
  const [endTime, setEndTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferEndTime = async () => {
      try {
        const fetchedEndTime = await getOfferTimer();
        setEndTime(fetchedEndTime);
      } catch (err) {
        console.error('Error fetching offer timer from Context:', err);
        setError('Failed to load offer timer.');
        setEndTime(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfferEndTime();
  }, []);

  return (
    <OfferTimerContext.Provider value={{ endTime, isLoading, error }}>
      {children}
    </OfferTimerContext.Provider>
  );
};
