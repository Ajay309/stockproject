import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // optional for custom styling

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg position-fixed w-100 z-1  navbar-light bg-white shadow-sm py-1 px-3 px-lg-5">
      <Link className="navbar-brand fw-bold text-primary" to="/">📈 StockApp</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {/* Navigation Links */}
        <ul className="navbar-nav gap-2">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/plans' ? 'active-link' : ''}`} to="/plans">Plans</Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className={`nav-link dropdown-toggle ${location.pathname.startsWith('/stocks') ? 'active-link' : ''}`}
              to="#"
              id="resourceDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Resource
            </Link>
            <ul className="dropdown-menu border border-0 rounded-0 mt-2 shadow-sm" aria-labelledby="resourceDropdown">
              <li><Link className="dropdown-item " to="/blogs">Blogs</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/contact-us' ? 'active-link' : ''}`} to="/contact-us">Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/about-us' ? 'active-link' : ''}`} to="/about-us">About Us</Link>
          </li>
          
        </ul>

        {/* Desktop view: right-aligned */}
        <div className="ms-auto d-none d-lg-flex flex-column flex-lg-row justify-content-end gap-2 gap-lg-4 mt-3 mt-lg-0">
          <Link to="/login" className="login">Login</Link>
          <Link to="/get-started" className="get-started">Get Started</Link>
        </div>

        {/* Mobile view: bottom of menu links */}
        <div className="d-flex d-lg-none flex-column gap-2 mt-3">
          <Link to="/login" className="btn btn-outline-primary w-100">Login</Link>
          <Link to="/get-started" className="btn btn-primary w-100">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
