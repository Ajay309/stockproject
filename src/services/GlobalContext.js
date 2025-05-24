import React, { createContext, useEffect, useState } from 'react';
import { axiosInstance } from "./API";

// Create the context
export const GlobalContext = createContext();

// Create a provider for components to consume and update context
export const GlobalProvider = ({ children }) => {
  const [settingData, setsettingData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =  await axiosInstance.get('settings');
        setsettingData(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData(); 
  }, []);

  return (
    <GlobalContext.Provider value={{settingData,setsettingData,loading,setLoading}}>
      {children}
    </GlobalContext.Provider>
  );
};