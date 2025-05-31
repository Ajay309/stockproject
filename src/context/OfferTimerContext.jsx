import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const OfferTimerContext = createContext(null);

// Custom hook to use the context
export const useOfferTimer = () => {
  const context = useContext(OfferTimerContext);
  if (!context) {
    throw new Error('useOfferTimer must be used within an OfferTimerProvider');
  }
  return context;
};

// Provider Component
export const OfferTimerProvider = ({ children }) => {
  const [endTime, setEndTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferEndTime = async () => {
      try {
        const response = await axios.get('https://dtc.sinfode.com/api/v1/offertimer');
        console.log('Offer Timer API response from Context:', response.data);
        if (response.data && response.data.data && response.data.data.length > 0) {
          const fetchedEndTime = new Date(response.data.data[0].end_time);
          setEndTime(fetchedEndTime);
        } else {
          console.warn('Offer Timer API returned empty or invalid data from Context:', response.data);
          setEndTime(null); // Set endTime to null if no data
        }
      } catch (err) {
        console.error('Error fetching offer timer from Context:', err);
        setError('Failed to load offer timer.');
        setEndTime(null); // Set endTime to null on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfferEndTime();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <OfferTimerContext.Provider value={{ endTime, isLoading, error }}>
      {children}
    </OfferTimerContext.Provider>
  );
}; 