import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // ← Add this line
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ← Add this line
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';



import Header from './components/Navbar/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
    <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  </StrictMode>
)
