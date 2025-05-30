import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; // optional for custom styling
import { useAuth } from '../../context/AuthContext';

const navbarOffsetStyle = {
  position: 'fixed',
  top: '40px', // Estimated height of the notification bar
  left: 0,
  right: 0,
  zIndex: 9998, // Just below the notification bar
  backgroundColor: 'white',
  paddingTop: '10px',
  paddingBottom: '10px'
};

// Responsive adjustment for navbar top if notification bar height changes
const navbarResponsiveStyle = `
  @media (max-width: 600px) {
    .navbar {
      top: 60px !important; /* Adjusted top for smaller screens based on estimated taller notification bar */
    }
  }
`;

export default function Navbar() {
  const location = useLocation();
  const { userEmail, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    if (profile) {
      setUserProfile(profile);
    }
  }, [userEmail]);

  const handleLogout = () => {
    logout();
    setUserProfile(null);
    setShowDropdown(false);
    navigate('/'); // Redirect to home page after logout
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Toggle mobile menu
  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);

  // Close mobile menu on nav item click
  const handleNavItemClick = () => setMobileMenuOpen(false);

  return (
    <>
      <style>{navbarResponsiveStyle}</style>
      <nav className="navbar navbar-expand-lg w-100 navbar-light bg-white shadow-sm px-3 px-lg-5" style={navbarOffsetStyle}>
        <Link className="navbar-brand fw-bold text-primary" to="/" onClick={handleNavItemClick}>
          <img src="assets/logos/PNG-Logo.png" className='img-fluid' style={{ width: '100px' }} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={handleMobileMenuToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${mobileMenuOpen ? ' show' : ''}`} id="navbarNav">
          {/* Navigation Links */}
          <ul className="navbar-nav ms-auto me-4 gap-2">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`} to="/" onClick={handleNavItemClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/plans' ? 'active-link' : ''}`} to="/plans" onClick={handleNavItemClick}>Plans</Link>
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
                <li><Link className="dropdown-item " to="/blogs" onClick={handleNavItemClick}>Blogs</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact-us' ? 'active-link' : ''}`} to="/contact-us" onClick={handleNavItemClick}>Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about-us' ? 'active-link' : ''}`} to="/about-us" onClick={handleNavItemClick}>About Us</Link>
            </li>
          </ul>

          {/* Desktop view: right-aligned */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {userProfile ? (
              <div className="position-relative profile-dropdown">
                <div 
                  className="d-flex align-items-center cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: 'pointer' }}
                >
                  {userProfile.profileImage ? (
                    <img 
                      src={userProfile.profileImage} 
                      alt="Profile" 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #f6b40e',
                        background: '#f6b40e',
                        display: 'block'
                      }}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#f6b40e',
                      color: '#fff',
                      display: userProfile.profileImage ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      border: '2px solid #f6b40e',
                      marginLeft: userProfile.profileImage ? 0 : undefined
                    }}
                  >
                    {(() => {
                      if (!userProfile.name) return '';
                      const nameParts = userProfile.name.trim().split(' ');
                      if (nameParts.length > 1) {
                        return `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
                      } else {
                        return nameParts[0][0].toUpperCase();
                      }
                    })()}
                  </div>
                </div>
                
                {showDropdown && (
                  <div 
                    className="position-absolute bg-white shadow-sm rounded p-2"
                    style={{
                      top: '100%',
                      right: 0,
                      minWidth: '220px',
                      marginTop: '8px',
                      border: '1px solid #eee',
                      zIndex: 1000
                    }}
                  >
                    <div className="p-2 border-bottom mb-2">
                      <div className="text-muted fw-bold" style={{ fontSize: '0.95rem' }}>{userProfile.email}</div>
                    </div>
                    <Link 
                      to="/profile" 
                      className="btn btn-link w-100 text-start p-2"
                      style={{ textDecoration: 'none', color: '#333' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                    <Link 
                      to="/change-password" 
                      className="btn btn-link w-100 text-start p-2"
                      style={{ textDecoration: 'none', color: '#333' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <i className="bi bi-lock me-2"></i>
                      Change Password
                    </Link>
                    <div className="border-top my-1"></div>
                    <button 
                      className="btn btn-link text-danger w-100 text-start p-2"
                      onClick={handleLogout}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="login">Login</Link>
                <Link to="/get-started" className="get-started">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile view: bottom of menu links */}
          <div className="d-flex d-lg-none flex-column gap-2 mt-3">
            {userProfile ? (
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  {userProfile.profileImage ? (
                    <img 
                      src={userProfile.profileImage} 
                      alt="Profile" 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #f6b40e',
                        background: '#f6b40e',
                        display: 'block'
                      }} 
                      onError={e => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#f6b40e',
                      color: '#fff',
                      display: userProfile.profileImage ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      border: '2px solid #f6b40e',
                      marginLeft: userProfile.profileImage ? 0 : undefined
                    }}
                  >
                    {(() => {
                      if (!userProfile.name) return '';
                      const nameParts = userProfile.name.trim().split(' ');
                      if (nameParts.length > 1) {
                        return `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
                      } else {
                        return nameParts[0][0].toUpperCase();
                      }
                    })()}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Link 
                    to="/profile" 
                    className="btn btn-outline-primary"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="bi bi-person"></i>
                  </Link>
                  <button 
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="login">Login</Link>
                <Link to="/get-started" className="btn btn-primary w-100">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
