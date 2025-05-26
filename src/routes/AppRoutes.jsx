import { Routes, Route } from 'react-router-dom';
import React from 'react'

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Plans from '../pages/plans';
import ContactUs from '../pages/ContactUs';
import AboutUS from '../pages/AboutUs';
import Blogs from '../pages/Blogs';
import PurchaseForm from '../pages/Purchase'; // ✅ Importing the new PurchaseForm component
import BlogDetail from '../pages/BlogDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUS />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/purchase" element={<PurchaseForm />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
 {/* ✅ New route */}

    </Routes>
  );
}
