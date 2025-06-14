import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; // optional for custom styling
import { useAuth } from '../../context/AuthContext';

const navbarStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  zIndex: 9998,
  backgroundColor: 'white',
  paddingTop: '10px',
  paddingBottom: '10px',
  transition: 'top 0.3s ease'
};

export default function Navbar() {
  const location = useLocation();
  const { userEmail, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNotificationBar, setHasNotificationBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkNotificationBar = () => {
      setHasNotificationBar(document.body.classList.contains('has-notification-bar'));
    };

    // Initial check
    checkNotificationBar();

    // Create a MutationObserver to watch for changes
    const observer = new MutationObserver(checkNotificationBar);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

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
      <style>{`
        .navbar {
          top: 0;
        }
        .navbar.with-notification {
          top: 40px;
        }
        @media (max-width: 600px) {
          .navbar.with-notification {
            top: 60px;
          }
        }
      `}</style>
      <nav 
        className={`navbar navbar-expand-lg w-100 navbar-light bg-white shadow-sm px-3 px-lg-5 ${hasNotificationBar ? 'with-notification' : ''}`} 
        style={navbarStyle}
      >
        <Link className="navbar-brand fw-bold text-primary" to="/" onClick={handleNavItemClick}>
          <img src="/assets/logos/PNG-Logo.png" className='img-fluid' style={{ width: '100px' }} alt="Logo" />
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
              <div className="mobile-logged-in-actions d-flex align-items-center justify-content-between p-3 border-top w-100">
                 {/* Profile image/initials */}
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
                {/* Profile, Change Password, Logout Links (Horizontal on mobile as per user image) */}
                <div className="mobile-profile-actions d-flex align-items-center gap-3">
                   <Link 
                      to="/profile" 
                      className="mobile-profile-link" 
                      onClick={handleNavItemClick}
                   >
                      Profile
                   </Link>
                   <Link 
                      to="/change-password" 
                      className="mobile-change-password-link" 
                      onClick={handleNavItemClick}
                   >
                      Change Password
                   </Link>
                   <button 
                      onClick={() => { handleLogout(); handleNavItemClick(); }}
                      className="mobile-logout-link" 
                   >
                      Logout
                   </button>
                </div>
              </div>
            ) : (
              <>
                {/* Ensure these also close the menu */}
                <Link to="/login" className="login-mobile" onClick={handleNavItemClick}>Login</Link>
                <Link to="/get-started" className="get-started-mobile" onClick={handleNavItemClick}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
