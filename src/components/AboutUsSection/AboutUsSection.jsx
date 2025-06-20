import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUsSection.css';

import { getSettings, getCertifications } from '../../api'; 



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
          <h1 className="hero-title">
  {/* <span className="indent">About</span><br /> */}
  Dream Trading Club<br />
  {/* <span className="indent">Club</span> */}
</h1>

            <div className="hero-description">
              <h4><span className="indent-4" >Together, we're not just building profits -</span></h4>
              <h4><span className="indent-3" > We're building a future of responsible, informed and</span></h4>
              <h4><span className="indent-1">empowered traders</span></h4>
              <h4><span className="indent-2">-- Saini brothers</span></h4>
            </div>
            
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
                <div dangerouslySetInnerHTML={{ __html: about_setting.our_offer }} />
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
                <img src="assets/logos/employee2.png" alt="Employees" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.employee}</div>
              {/* <div className="stat-label">Employees</div> */}
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="assets/logos/quality.png" alt="Expertise" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.experience}</div>
              {/* <div className="stat-label">Years of Experience</div> */}
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="assets/logos/client2.png" alt="Happy Clients" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.happy_smile}</div>
              {/* <div className="stat-label">Happy Clients</div> */}
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="\assets\logos\earth.png" alt="Students" className="stat-logo" />
              </div>
              <div className="stat-number">{about_setting.students}</div>
              {/* <div className="stat-label">Years of Experience</div> */}
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
{/* Certifications Section */}
<section id="certifications" className="content-section alt-bg">
  <div className="section-container">
    <h2 className="section-title">Our Certifications</h2>

    {certification.length > 0 && (
      <div className="certification-slider">
        {/* Arrows */}
        <button
          className="slider-arrow prev"
          onClick={() =>
            setCurrentSlide((prev) =>
              (prev - 1 + certification.length) % certification.length
            )
          }
        >
          &#8592;
        </button>

        {/* Slides */}
        <div className="certification-slides">
          {certification
            .slice(currentSlide, currentSlide + 3)
            .concat(
              certification.length - currentSlide < 3
                ? certification.slice(0, 3 - (certification.length - currentSlide))
                : []
            )
            .map((cert, index) => (
              <div className="certification-slide" key={index}>
                <img src={cert.image} alt={cert.alt} />
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          className="slider-arrow next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % certification.length)}
        >
          &#8594;
        </button>
      </div>
    )}

    {/* Dots */}
    {certification.length > 0 && (
      <div className="slider-dots">
        {certification.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
          ></div>
        ))}
      </div>
    )}
  </div>
</section>



      {/* Why Choose DTC Section */}
      <section id="why-dtc" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Dream Trading Club</h2>
          <div className="section-layout">
            <div className="section-text-content">
                <div dangerouslySetInnerHTML={{ __html: about_setting.learn_description }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;