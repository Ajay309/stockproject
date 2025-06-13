import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaTelegram, FaGooglePlay } from 'react-icons/fa';

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

  // Function to handle navigation with scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to handle FAQ section navigation
  const handleFaqNavigation = () => {
    navigate('/');
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const faqSection = document.querySelector('.faq-custom-style');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Function to handle Process section navigation
  const handleProcessNavigation = () => {
    navigate('/');
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const processSection = document.getElementById('process');
      if (processSection) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const processSectionTop = processSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: processSectionTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Function to handle Review section navigation
  const handleReviewNavigation = () => {
    navigate('/');
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const reviewSection = document.getElementById('review');
      if (reviewSection) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const reviewSectionTop = reviewSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: reviewSectionTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Function to handle Enquiry Form navigation
  const handleEnquiryNavigation = () => {
    navigate('/');
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const enquiryForm = document.getElementById('enquiry-form');

      if (enquiryForm) {
        enquiryForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Function to handle assistant chat
  const handleAssistantChat = () => {
    // You can implement the logic to open the assistant chat here
    // For example, if you have a state or context for the assistant chat
    // you can set it to open here
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('https://dtc.sinfode.com/api/v1/settings');
        const result = await response.json();
        if (result.status === 'success' && result.data?.common_setting) {
          const settings = result.data.common_setting;
          setSocialLinks({
            facebook: settings.facebook || '',
            twitter: settings.twitter || '',
            instagram: settings.instagram || '',
            linkedin: settings.linkedin || '',
            youtube: settings.youtube || '',
            telegram: settings.telegram || ''
          });
          setPhoneNumber(settings.phone_number || '');
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleWhatsAppClick = () => {
    if (!phoneNumber) {
      alert('WhatsApp number not available');
      return;
    }
    // Format phone number for WhatsApp URL (remove spaces, +, etc. if needed)
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  return (
    <footer className="footer-section bg-dark text-white py-3 position-relative">
      <div className="container">
        <h1 className="px-5 py-4 mb-4 heading-10 text-center">
          The only platform that can support your company at any scale
        </h1>
        <div className="button-footer">
          <Link to="/get-started" className="btn btn-light btn-lg fw-semibold rounded-pill px-5 py-3 mb-4" onClick={() => handleNavigation('/get-started')}>
            Get started
          </Link>
        </div>

        <div className="footer-top-section">
        {/* DTC Logo */}
<div className="footer-logo-container">
  <span className="footer-logo-text">DTC Trading Club</span>
</div>


          {/* Social Media Links Section */}
          <div className="social-media-links">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3 fs-3"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3 fs-3"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3 fs-3"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3 fs-3"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-3"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            )}
            {socialLinks.telegram && (
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-3"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
            )}
          </div>
        </div>

        <hr className="container" />

        {/* Page Links Section */}
        <div className="container mx-auto mt-16 pb-8">
          <div className="footer-menu-responsive">
            <div className="footer-column">
              <h5>Company</h5>
              <Link to="/about-us" className="hover:text-white transition" onClick={() => handleNavigation('/about-us')}>About Us</Link>
              <Link to="/partners" className="hover:text-white transition" onClick={() => handleNavigation('/partners')}>Partners</Link>
              <Link to="/privacy-policy" className="hover:text-white transition" onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</Link>
            </div>
            <div className="footer-column">
              <h5>Resources</h5>
              <Link to="/blogs" className="hover:text-white transition" onClick={() => handleNavigation('/blogs')}>Blog</Link>
              <Link to="/plans" className="hover:text-white transition" onClick={() => handleNavigation('/plans')}>Plans</Link>
              <button 
                className="hover:text-white transition border-0 bg-transparent text-white" 
                onClick={handleProcessNavigation}
                style={{ textAlign: 'left', padding: 0 }}
              >
                Trading Guides
              </button>
            </div>
            <div className="footer-column">
              <h5>Support</h5>
              <button 
                className="hover:text-white transition border-0 bg-transparent text-white" 
                onClick={handleFaqNavigation}
                style={{ textAlign: 'left', padding: 0 }}
              >
                FAQs
              </button>
              <Link to="/contact-us" className="hover:text-white transition" onClick={() => handleNavigation('/contact-us')}>Contact Us</Link>
              <button 
                className="hover:text-white transition border-0 bg-transparent text-white" 
                onClick={handleAssistantChat}
                style={{ textAlign: 'left', padding: 0 }}
              >
                Live Chat
              </button>
              <Link 
                to="/"
                className="hover:text-white transition" 
                onClick={handleEnquiryNavigation}
                style={{ textAlign: 'left', padding: 0, display: 'block', textDecoration: 'none' }}
              >
                Help Center
              </Link>
              <button 
                className="hover:text-white transition border-0 bg-transparent text-white" 
                onClick={handleReviewNavigation}
                style={{ textAlign: 'left', padding: 0 }}
              >
                Feedback
              </button>
            </div>
            <div className="footer-column">
              <h5>Download App</h5>
              <a 
                href="https://play.google.com/store" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="play-store-link"
              >
                <div className="play-store-text-container">
                  <div className="play-store-get-it-on">GET IT ON</div>
                  <div className="play-store-name">Google Play</div>
                </div>
                <FaGooglePlay style={{ fontSize: '24px' }} />
              </a>
            </div>
          </div>
        </div>

        <hr className="container" />

        {/* Disclaimer paragraphs here */}
        <p className="footer-text text-start small">
          Trading is risky and many will lose money in connection with trading activities. All content on this site is not intended to, and should not be, construed as financial advice. Decisions to buy, sell, hold, or trade in securities, commodities, and other markets involve risk and are best made based on the advice of qualified financial professionals. Past performance does not guarantee future results.
        </p>

        <p>
          Hypothetical or simulated performance results have certain limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, since the trades have not been executed, the results may have under- or over-compensated for the impact, if any, of certain market factors, including, but not limited to, lack of liquidity. Simulated trading programs, in general, are designed with the benefit of hindsight and are based on historical information. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.
        </p>

        <p>
          Testimonials appearing on this website may not be representative of other clients or customers and are not a guarantee of future performance or success.
        </p>

        <p>
          As a provider of technical analysis tools for charting platforms, DTC Trading Club does not have access to the personal trading accounts or brokerage statements of its customers. As a result, we have no reason to believe our customers perform better or worse than traders as a whole based on any content or tool we provide.
        </p>

        <p>
          Charts used on this site are by TradingView®, on which the majority of our tools are built. TradingView® is a registered trademark of TradingView, Inc. www.TradingView.com. TradingView® has no affiliation with the owner, developer, or provider of the services described herein.
        </p>

        <p>
          This does not represent our full disclaimer. Please read our full disclaimer.
        </p>

        {/* WhatsApp Floating Button */}
        <div className="floating-btn whatsapp" onClick={handleWhatsAppClick} style={{ cursor: 'pointer' }}>
          <FaWhatsapp />
        </div>

        {/* Existing Floating Button */}
        {/* <div className="floating-btn other">
          <img src="/path/to/icon.png" alt="Floating Button" width="30" height="30" />
        </div> */}

        <hr className="container" />

        <p className="text-center text-white-300 mt-4">
          &copy; {new Date().getFullYear()} DTC Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;