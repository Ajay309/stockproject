// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext(null);

// Custom hook with safety check
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile on initial mount
  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      const savedToken = localStorage.getItem('auth_token');
      
      if (savedProfile && savedToken) {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        setUserEmail(profile.email);
      }
      setIsLoading(false);
    };

    loadProfile();
  }, []);

  const login = (profile) => {
    setUserProfile(profile);
    setUserEmail(profile.email);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const logout = () => {
    localStorage.removeItem('auth_email');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userProfile');
    setUserEmail(null);
    setUserProfile(null);
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ userProfile, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
