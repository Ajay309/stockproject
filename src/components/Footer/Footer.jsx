import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-white py-3 position-relative">
      <div className="container">
        <h1 className="px-5 py-4 mb-4 mb-4 heading-10 text-center">The only platform that can support your company at any scale</h1>
        <div className="button-footer">
          <Link to="/get-started" className="btn btn-light btn-lg fw-semibold rounded-pill px-5 py-3 mb-4">
            Get started
          </Link>
        </div>
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
        <div className="floating-btn position-fixed rounded-circle bg-white d-flex align-items-center justify-content-center shadow" style={{ bottom: '30px', right: '30px', width: '60px', height: '60px' }}>
          <img src="/path/to/icon.png" alt="Floating Button" width="30" height="30" />
        </div> 
      <hr className='container'></hr>
      {/* Page Links Section */}
      <div className="container mx-auto mt-16 pb-8">
        <div className="footer-menu-responsive">
          <div className="footer-column">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
            <a href="/faq" className="hover:text-white transition">FAQ</a>
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="/security" className="hover:text-white transition">Security</a>
          </div>
          <div className="footer-column">
            <a href="/about" className="hover:text-white transition">Plans</a>
            <a href="/features" className="hover:text-white transition">Features</a>
            <a href="/solutions" className="hover:text-white transition">Solutions</a>
            <a href="/integrations" className="hover:text-white transition">Integrations</a>
            <a href="/api" className="hover:text-white transition">API</a>
            <a href="/developers" className="hover:text-white transition">Developers</a>
          </div>
          <div className="footer-column">
            <a href="/services" className="hover:text-white transition">Resource</a>
            <a href="/webinars" className="hover:text-white transition">Webinars</a>
            <a href="/events" className="hover:text-white transition">Events</a>
            <a href="/case-studies" className="hover:text-white transition">Case Studies</a>
            <a href="/success-stories" className="hover:text-white transition">Success Stories</a>
            <a href="/customer-stories" className="hover:text-white transition">Customer Stories</a>
          </div>
          <div className="footer-column">
            <a href="/pricing" className="hover:text-white transition">About Us</a>
            <a href="/company" className="hover:text-white transition">Company</a>
            <a href="/careers" className="hover:text-white transition">Careers</a>
            <a href="/team" className="hover:text-white transition">Team</a>
            <a href="/partners" className="hover:text-white transition">Partners</a>
            <a href="/investors" className="hover:text-white transition">Investors</a>
          </div>
          <div className="footer-column">
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <a href="/support" className="hover:text-white transition">Support</a>
            <a href="/help" className="hover:text-white transition">Help Center</a>
            <a href="/community" className="hover:text-white transition">Community</a>
            <a href="/feedback" className="hover:text-white transition">Feedback</a>
            <a href="/contact-us" className="hover:text-white transition">Contact Us</a>
          </div>
        </div>
      </div>
      <hr className='container'></hr>
        {/* Social Media Links Section */}
        <div className="social-media-links text-center mt-4 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaFacebook/></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaTwitter/></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-3"><FaYoutube/></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-3"><FaInstagram />
          </a>
      </div>
      
        <p className="text-center text-white-300 mt-4">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;