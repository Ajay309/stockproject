import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  });

  const [phoneNumber, setPhoneNumber] = useState('');

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
            youtube: settings.youtube || ''
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
          <Link to="/get-started" className="btn btn-light btn-lg fw-semibold rounded-pill px-5 py-3 mb-4">
            Get started
          </Link>
        </div>

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

        {/* Page Links Section */}
        <div className="container mx-auto mt-16 pb-8">
          <div className="footer-menu-responsive">
            <div className="footer-column">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/blogs" className="hover:text-white transition">Blog</Link>
              <Link to="/plans" className="hover:text-white transition">FAQ</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
              <Link to="/security" className="hover:text-white transition">Security</Link>
            </div>
            <div className="footer-column">
              <Link to="/plans" className="hover:text-white transition">Plans</Link>
              <Link to="/features" className="hover:text-white transition">Features</Link>
              <Link to="/solutions" className="hover:text-white transition">Solutions</Link>
              <Link to="/integrations" className="hover:text-white transition">Integrations</Link>
              <Link to="/api" className="hover:text-white transition">API</Link>
              <Link to="/developers" className="hover:text-white transition">Developers</Link>
            </div>
            <div className="footer-column">
              <Link to="/services" className="hover:text-white transition">Resource</Link>
              <Link to="/webinars" className="hover:text-white transition">Webinars</Link>
              <Link to="/events" className="hover:text-white transition">Events</Link>
              <Link to="/case-studies" className="hover:text-white transition">Case Studies</Link>
              <Link to="/success-stories" className="hover:text-white transition">Success Stories</Link>
              <Link to="/customer-stories" className="hover:text-white transition">Customer Stories</Link>
            </div>
            <div className="footer-column">
              <Link to="/about-us" className="hover:text-white transition">About Us</Link>
              <Link to="/company" className="hover:text-white transition">Company</Link>
              <Link to="/careers" className="hover:text-white transition">Careers</Link>
              <Link to="/team" className="hover:text-white transition">Team</Link>
              <Link to="/partners" className="hover:text-white transition">Partners</Link>
              <Link to="/investors" className="hover:text-white transition">Investors</Link>
            </div>
            <div className="footer-column">
              <Link to="/contact-us" className="hover:text-white transition">Contact</Link>
              <Link to="/support" className="hover:text-white transition">Support</Link>
              <Link to="/help" className="hover:text-white transition">Help Center</Link>
              <Link to="/community" className="hover:text-white transition">Community</Link>
              <Link to="/feedback" className="hover:text-white transition">Feedback</Link>
              <Link to="/contact-us" className="hover:text-white transition">Contact Us</Link>
            </div>
          </div>
        </div>

        <hr className="container" />

        {/* Social Media Links Section */}
        <div className="social-media-links text-center mt-4 mb-4">
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
        </div>

        <p className="text-center text-white-300 mt-4">
          &copy; {new Date().getFullYear()} DTC Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
