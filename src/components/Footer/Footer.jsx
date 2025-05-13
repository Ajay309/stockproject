import React from 'react';
import './Footer.css';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-white py-3 position-relative">
      <div className="container">
        <h1 className="px-5 py-4 mb-4 mb-4 heading-10 text-center">The only platform that can support your company at any scale</h1>
        <div className="button-footer">
        <button variant="light" className="btn-lg fw-semibold rounded-pill px-5 py-3 mb-4">
          Get started
        </button>
        </div>
        <p className="footer-text text-start small">
          1. Accurate as of December 2023, includes free and paid users.<br />
          2. See the 2024 Gartner® Magic Quadrant™ for Collaborative Work Management (CWM). GARTNER is a registered trademark and service mark of Gartner, Inc. and/or its affiliates in the U.S. and internationally, MAGIC QUADRANT and PEER INSIGHTS are registered trademarks and The GARTNER PEER INSIGHTS CUSTOMERS’ CHOICE badge is a trademark and service mark of Gartner, Inc. and/or its affiliates and is used herein with permission. All rights reserved.<br />
          3. See The Forrester Wave™: Collaborative Work Management Tools, Q4 2022 report. The Forrester Wave is copyrighted by Forrester Research, Inc. Forrester and its affiliates, and is used herein with permission. All rights reserved.
        </p>
        <div className="floating-btn position-fixed rounded-circle bg-white d-flex align-items-center justify-content-center shadow" style={{ bottom: '30px', right: '30px', width: '60px', height: '60px' }}>
          <img src="/path/to/icon.png" alt="Floating Button" width="30" height="30" />
        </div> 
      <hr className='container'></hr>
      {/* Page Links Section */}
      <div className="container mx-auto  mt-16 pb-8">
        <ul className="flex flex-wrap d-flex navbar-link justify-center gap-8 text-gray-300">
          <li><a href="/" className="hover:text-white transition py-3">Home</a>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/security" className="hover:text-white transition">Security</a></li>
            <li><a href="/status" className="hover:text-white transition">Status</a></li>
          </li>
          <li><a href="/about" className="hover:text-white transition">Plans</a>
            <li><a href="/features" className="hover:text-white transition">Features</a></li>
            <li><a href="/solutions" className="hover:text-white transition">Solutions</a></li>
            <li><a href="/integrations" className="hover:text-white transition">Integrations</a></li>
            <li><a href="/api" className="hover:text-white transition">API</a></li>
            <li><a href="/developers" className="hover:text-white transition">Developers</a></li>
          </li>
          <li><a href="/services" className="hover:text-white transition">Resource</a>
            <li><a href="/webinars" className="hover:text-white transition">Webinars</a></li>
            <li><a href="/events" className="hover:text-white transition">Events</a></li>
            <li><a href="/case-studies" className="hover:text-white transition">Case Studies</a></li>
            <li><a href="/success-stories" className="hover:text-white transition">Success Stories</a></li>
            <li><a href="/customer-stories" className="hover:text-white transition">Customer Stories</a></li>
          </li>
          <li><a href="/pricing" className="hover:text-white transition">About Us</a>
            <li><a href="/company" className="hover:text-white transition">Company</a></li>
            <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
            <li><a href="/team" className="hover:text-white transition">Team</a></li>
            <li><a href="/partners" className="hover:text-white transition">Partners</a></li>
            <li><a href="/investors" className="hover:text-white transition">Investors</a></li>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <li><a href="/support" className="hover:text-white transition">Support</a></li>
            <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
            <li><a href="/community" className="hover:text-white transition">Community</a></li>
            <li><a href="/feedback" className="hover:text-white transition">Feedback</a></li>
            <li><a href="/contact-us" className="hover:text-white transition">Contact Us</a>
          </li>
          </li>
        </ul>
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