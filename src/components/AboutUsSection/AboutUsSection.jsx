import React from 'react';

import './AboutUsSection.css'; // Import your CSS file for styling
import { section } from 'framer-motion/client';
import { FaLightbulb, FaUser, FaHeart, FaRocket, FaGlobe,FaHandshake } from 'react-icons/fa';


const AboutUsSection = () => {
  return (
    <>
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 animate">
            <h1 className="display-4 text-white fw-bold mb-4">About Our Company</h1>
            <p className="lead mb-4">We're a passionate team dedicated to creating innovative solutions that make a difference in people's lives.</p>
            <button className="btn btn-light btn-lg px-4 me-2">Our Services</button>
            <button className="btn btn-outline-light btn-lg px-4">Contact Us</button>
          </div>
          <div className="col-lg-6 animate delay-1">
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="img-fluid">
              <path fill="#ffffff" fillOpacity="0.2" d="M38.5,-65.1C46.9,-55.3,49.4,-39.1,55.5,-24.7C61.5,-10.3,71.2,2.3,71.8,15.3C72.4,28.3,63.9,41.6,52.3,51.5C40.6,61.3,25.8,67.7,10.4,70.9C-5,74.1,-21,74.1,-34.9,68.1C-48.8,62.1,-60.5,50.1,-67.8,35.8C-75.1,21.5,-78,4.9,-75.8,-11.2C-73.6,-27.2,-66.3,-42.7,-54.7,-52.5C-43.1,-62.3,-27.2,-66.4,-12.2,-65.8C2.8,-65.2,30.1,-74.9,38.5,-65.1Z" transform="translate(250 200)" />
              <circle cx="250" cy="200" r="120" fill="#ffffff" fillOpacity="0.1" />
              <path fill="none" stroke="#ffffff" strokeWidth="2" d="M100,200 Q250,120 400,200" />
              <path fill="none" stroke="#ffffff" strokeWidth="2" d="M100,220 Q250,300 400,220" />
            </svg>
          </div>
        </div>
      </div>
      </section>
  <section className="about-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0 animate">
            <h2 className="section-title heading-22">Our Story</h2>
            <p className="lead mb-4 heading-22">Founded in 2010, we started with a simple mission: to create solutions that matter.</p>
            <p>Our journey began when our founders recognized a gap in the market for user-friendly, innovative products that could solve everyday problems. What started as a small team working out of a garage has now grown into a thriving company with a global presence.</p>
            <p>Throughout our growth, we've remained committed to our core values of innovation, quality, and customer satisfaction. We believe in pushing boundaries and challenging the status quo to deliver exceptional experiences.</p>
            <p>Today, we're proud to serve thousands of customers worldwide, helping them achieve their goals through our cutting-edge solutions and dedicated support.</p>
          </div>
          <div className="col-lg-6 animate delay-1">
            <div className="position-relative">
              <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="img-fluid">
                <rect x="50" y="50" width="400" height="300" rx="20" fill="#f0f4ff" />
                <circle cx="150" cy="120" r="50" fill="#3a86ff" fillOpacity="0.7" />
                <rect x="220" y="90" width="200" height="20" rx="5" fill="#8338ec" fillOpacity="0.7" />
                <rect x="220" y="130" width="150" height="20" rx="5" fill="#8338ec" fillOpacity="0.5" />
                <path d="M80,200 L420,200 L420,300 L80,300 Z" fill="#ff006e" fillOpacity="0.1" />
                <circle cx="120" cy="250" r="25" fill="#ff006e" fillOpacity="0.6" />
                <rect x="160" y="235" width="230" height="15" rx="5" fill="#3a86ff" fillOpacity="0.5" />
                <rect x="160" y="265" width="180" height="15" rx="5" fill="#3a86ff" fillOpacity="0.3" />
              </svg>
              <div className="position-absolute" style={{ top: '20px', right: '20px', background: '#ff006e', color: 'white', padding: '10px 20px', borderRadius: '30px', transform: 'rotate(10deg)' }}>
                <span className="fw-bold">Est. 2010</span>
              </div>
            </div>
          </div>
        </div>
      </div>
 </section>

      <div className="container">
        <div className="text-center mb-5 animate">
          <h2 className="section-title d-inline-block">Our Core Values</h2>
          <p className="lead heading-22">The principles that guide everything we do</p>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4 animate delay-1">
            <div className="card value-card p-4">
              <div className="value-icon">
                <i className=""><FaLightbulb/></i>
              </div>
              <h3 className="h4 mb-3">Innovation</h3>
              <p>We constantly push boundaries and explore new ideas to create solutions that are ahead of their time.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4 animate delay-2">
            <div className="card value-card p-4">
              <div className="value-icon">
                <i className="fas fa-users"><FaUser/></i>
              </div>
              <h3 className="h4 mb-3">Collaboration</h3>
              <p>We believe in the power of teamwork and partnership to achieve extraordinary results.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4 animate delay-3">
            <div className="card value-card p-4">
              <div className="value-icon">
                <i className="fas fa-heart"><FaHeart/></i>
              </div>
              <h3 className="h4 mb-3">Integrity</h3>
              <p>We conduct our business with honesty, transparency, and a strong ethical foundation.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4 animate delay-2">
            <div className="card value-card p-4">
              <div className="value-icon">
                <i className="fas fa-rocket"><FaRocket/></i>
              </div>
              <h3 className="h4 mb-3">Excellence</h3>
              <p>We strive for the highest standards in everything we do, from product development to customer service.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4 animate delay-3">
            <div className="card value-card p-4">
              <div className="value-icon">
                <i className="fas fa-globe"><FaGlobe/></i>
              </div>
              <h3 className="h4 mb-3">Sustainability</h3>
              <p>We're committed to practices that protect our environment and contribute to a better future.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4 animate delay-4">
            <div className="card value-card p-4">
              <div className="value-icon">
                <i className="fas fa-handshake"><FaHandshake/></i>
              </div>
              <h3 className="h4 mb-3">Customer Focus</h3>
              <p>We put our customers at the center of everything we do, ensuring their success is our success.</p>
            </div>
          </div>
        </div>
      </div>
    
      {/* <div className="container">
        <div className="text-center mb-5 animate">
<h2 className="section-title d-inline-block">Meet Our Team</h2>
<p className="lead">The talented individuals driving our success</p>
</div>
<div className="row w-100 h-100">
<div className="col-md-3 mb-4 animate delay-1">
<div className="card team-card">
<img src="/assets/images/client1.jpg" alt="Team member" className="card-img-top" />
<div className="card-body text-center">
<h4 className="card-title">John Doe</h4>
<p className="card-text">CEO & Founder</p>
</div>
</div>
</div>

<div className="col-md-3 mb-4 animate delay-3">
<div className="card team-card">
<img src="/assets/images/client3.png" alt="Team member" className="card-img-top" />
<div className="card-body text-center">
<h4 className="card-title">Emily Johnson</h4>
<p className="card-text">Head of Marketing</p>
</div>
</div>
</div>
<div className="col-md-3 mb-4 animate delay-4">
<div className="card team-card">
<img src="/assets/images/client4.png" alt="Team member" className="card-img-top" />
<div className="card-body text-center">
<h4 className="card-title">Michael Lee</h4>
<p className="card-text">Lead Designer</p>
</div>
</div>
</div>
</div>
</div> */}
    </>
    );
    }
export default AboutUsSection;
