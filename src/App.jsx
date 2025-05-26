import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import NotificationBar from './components/Navbar/NotificationBar';
import Home from './pages/Home';  
import FeaturesSection from './components/FeatureSection/FeatureSection';


function App() {
  return (
    <>
    <BrowserRouter>
      <NotificationBar />
      <Navbar />
        <AppRoutes />
    </BrowserRouter>
  </>
  );
}

export default App;
