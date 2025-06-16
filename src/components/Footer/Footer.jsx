// src/components/Footer.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaYoutube, FaWhatsapp, FaTelegram, FaGooglePlay
} from 'react-icons/fa';
import { getSettings } from '../../api';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    telegram: ''
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqNavigation = () => {
    navigate('/');
    setTimeout(() => {
      const faqSection = document.querySelector('.faq-custom-style');
      faqSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleProcessNavigation = () => {
    navigate('/');
    setTimeout(() => {
      const processSection = document.getElementById('process');
      if (processSection) {
        const offset = processSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offset - (document.querySelector('.navbar')?.offsetHeight || 0),
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleReviewNavigation = () => {
    navigate('/');
    setTimeout(() => {
      const reviewSection = document.getElementById('review');
      if (reviewSection) {
        const offset = reviewSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offset - (document.querySelector('.navbar')?.offsetHeight || 0),
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleEnquiryNavigation = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAssistantChat = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    if (!phoneNumber) {
      alert('WhatsApp number not available');
      return;
    }
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      const settings = await getSettings();
      setSocialLinks({
        facebook: settings.facebook || '',
        twitter: settings.twitter || '',
        instagram: settings.instagram || '',
        linkedin: settings.linkedin || '',
        youtube: settings.youtube || '',
        telegram: settings.telegram || ''
      });
      setPhoneNumber(settings.phone_number || '');
    };

    fetchSettingsData();
  }, []);

  return (
    <footer className="footer-section bg-dark text-white py-3 position-relative">
      <div className="container">
        <h1 className="px-5 py-4 mb-4 heading-10 text-center">
          Welcome To The Place Where Traders Grow Together
        </h1>

        <div className="button-footer">
          <Link to="/get-started" className="btn btn-light btn-lg fw-semibold rounded-pill px-5 py-3 mb-4" onClick={() => handleNavigation('/get-started')}>
            Get started
          </Link>
        </div>

        <div className="footer-top-section">
          <div className="footer-logo-container">
            <span className="footer-logo-text">DTC Trading Club</span>
          </div>

          <div className="social-media-links">
            {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaFacebook /></a>}
            {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaTwitter /></a>}
            {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaLinkedin /></a>}
            {socialLinks.youtube && <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaYoutube /></a>}
            {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white fs-3"><FaInstagram /></a>}
            {socialLinks.telegram && <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-white fs-3"><FaTelegram /></a>}
          </div>
        </div>

        <hr className="container" />

        <div className="container mx-auto mt-16 pb-8">
          <div className="footer-menu-responsive">
            <div className="footer-column">
              <h5>Company</h5>
              <Link to="/about-us" onClick={() => handleNavigation('/about-us')}>About Us</Link>
              <Link to="/partners" onClick={() => handleNavigation('/partners')}>Partners</Link>
              <Link to="/privacy-policy" onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</Link>
            </div>
            <div className="footer-column">
              <h5>Resources</h5>
              <Link to="/blogs" onClick={() => handleNavigation('/blogs')}>Blog</Link>
              <Link to="/plans" onClick={() => handleNavigation('/plans')}>Plans</Link>
              <button onClick={handleProcessNavigation} className="bg-transparent border-0 text-white text-start">Trading Guides</button>
            </div>
            <div className="footer-column">
              <h5>Support</h5>
              <button onClick={handleFaqNavigation} className="bg-transparent border-0 text-white text-start">FAQs</button>
              <Link to="/contact-us" onClick={() => handleNavigation('/contact-us')}>Contact Us</Link>
              <button onClick={handleAssistantChat} className="bg-transparent border-0 text-white text-start">Live Chat</button>
              <button onClick={handleEnquiryNavigation} className="bg-transparent border-0 text-white text-start">Help Center</button>
              <button onClick={handleReviewNavigation} className="bg-transparent border-0 text-white text-start">Feedback</button>
            </div>
            <div className="footer-column">
              <h5>Download App</h5>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="play-store-link">
                <div className="play-store-text-container">
                  <div className="play-store-get-it-on">GET IT ON</div>
                  <div className="play-store-name">Google Play</div>
                </div>
                <FaGooglePlay style={{ fontSize: '24px' }} />
              </a>
            </div>
          </div>
        </div>


        
        <div className="floating-btn whatsapp" onClick={handleWhatsAppClick} style={{ cursor: 'pointer' }}>
          <FaWhatsapp />
        </div>

        <hr className="container" />

        <p className="text-center text-white-300 mt-4">
          &copy; {new Date().getFullYear()} DTC Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
