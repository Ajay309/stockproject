import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Plans from '../pages/Plans';
import ContactUs from '../pages/ContactUs';
import AboutUS from '../pages/AboutUs';
import Blogs from '../pages/Blogs';
import GetStarted from '../pages/GetStarted';
import BlogDetail from '../pages/BlogDetail';
import PurchaseForm from '../pages/Purchase';
import FeaturesSection from '../components/FeatureSection/FeatureSection';
import ProfilePage from '../pages/ProfilePage';
import Partners from '../pages/Partners';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<FeaturesSection />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUS />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:blogId" element={<BlogDetail/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/purchase" element={<PurchaseForm />} />
      <Route path="/get-started" element={<GetStarted/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/trading-guides" element={<Navigate to="/#process" replace />} />
      <Route path="/feedback" element={<Navigate to="/#review" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
  );
}
