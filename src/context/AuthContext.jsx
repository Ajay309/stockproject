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

  const [user, setUser] = useState({
    email: "ajay@example.com",
    phone: "9999999999",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('auth_email');
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const login = (email) => {
    localStorage.setItem('auth_email', email);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('auth_email');
    localStorage.removeItem('auth_token');
    setUserEmail(null);
  };

  

  return (
    <AuthContext.Provider value={{ user, setUser, userEmail, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};
