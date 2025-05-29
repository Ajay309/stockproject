import React from 'react';
import ContactUsSection from '../components/ContactUsSection/ContactUsSection';
import Footer from '../components/Footer/Footer';
import BlogsSection from '../components/Blogs/BlogsSection';
import { getHomeData } from "../services/home";

export default function Blogs ()  {
  return (
    <>
    <div className="container-fluid py-5 pt-5 with-navbar-padding" style={{paddingTop: '110px'}}>
      <BlogsSection />
      </div>
    <Footer/>
    </>
  )
}