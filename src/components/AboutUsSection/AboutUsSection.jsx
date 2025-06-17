import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUsSection.css';

const AboutUsSection = () => {
  const [settings, setSettings] = useState(null);
  const [certification, setCertification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSettingsAndCertification = async () => {
      try {
        // Fetch site settings
        const settingsRes = await fetch('https://dtc.sinfode.com/api/v1/settings');
        const settingsData = await settingsRes.json();

        if (settingsData.status === 'success') {
          setSettings(settingsData.data);
        } else {
          setError('Failed to fetch settings');
        }

        // Fetch certifications
        const certRes = await fetch('https://dtc.sinfode.com/api/v1/certifiaction');
        const certData = await certRes.json();

        if (certData.status === 'success') {
          const formattedCerts = certData.data.map((item) => ({
            image: item.image,
            alt: `Certification ${item.id}`,
          }));
          setCertification(formattedCerts);
        } else {
          setError('Failed to fetch certifications');
        }

      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettingsAndCertification();
  }, []);

  // Auto slide effect
  useEffect(() => {
    if (certification.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % certification.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [certification]);

  if (loading) {
    return <div className="about-us-container">Loading...</div>;
  }

  if (error) {
    return <div className="about-us-container">Error: {error}</div>;
  }

  const { about_setting } = settings;

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">About Dream Trading Club</h1>
            
          </div>
          <div className="hero-image">
            <img src={about_setting.image} alt="About DTC" className="hero-illustration" />
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="about-nav">
        <div className="nav-container">
          <a href="#company" className="nav-link">Company Intro</a>
          <a href="#offers" className="nav-link">What We Offer</a>
          <a href="#community" className="nav-link">Our Community</a>
          <a href="#mission" className="nav-link">Mission & Vision</a>
          <a href="#certifications" className="nav-link">Our Certifications</a>
          <a href="#why-dtc" className="nav-link">Why Choose DTC</a>
        </div>
      </nav>

      {/* Company Intro Section */}
      <section id="company" className="content-section alt-bg">
        <div className="section-container">
          <h2 className="section-title">Company Intro</h2>
          <div className="section-layout">
            <div className="section-text-content">
              <p>{about_setting.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="offers" className="content-section">
        <div className="section-container">
          <div className="section-layout">
            <div className="section-text-content">
              <h2 className="section-title">What We Offer</h2>
              <p className="section-description">{about_setting.our_offer}</p>
            </div>
            <div className="section-image">
              <img src={about_setting.banner_image} alt="What We Offer" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="content-section alt">
        <div className="section-container">
          <h2 className="section-title">Our Community</h2>
          <div className="section-layout">
            <div className="section-text-content"></div>
          </div>
          <div className="community-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <img src="src/assets/logos/employee2.png" alt="Employees" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.employee}</div>
              {/* <div className="stat-label">Employees</div> */}
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="src/assets/logos/quality.png" alt="Expertise" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.experience}</div>
              {/* <div className="stat-label">Years of Experience</div> */}
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="src/assets/logos/client2.png" alt="Happy Clients" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.happy_smile}</div>
              {/* <div className="stat-label">Happy Clients</div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Mission, Vision & Goals</h2>
          <div className="section-layout reverse">
            <div className="section-text-content">
              <div dangerouslySetInnerHTML={{ __html: about_setting.mission }} />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="content-section alt-bg">
        <div className="section-container">
          <h2 className="section-title">Our Certifications</h2>
          <div className="logo-slider">
            <div className="slider-track">
              {[...certification, ...certification].map((cert, index) => (
                <div className="slide" key={index}>
                  <img src={cert.image} alt={cert.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DTC Section */}
      <section id="why-dtc" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Dream Trading Club</h2>
          <div className="section-layout">
            <div className="section-text-content">
              <p>{about_setting.learn_description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;