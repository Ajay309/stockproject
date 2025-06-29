// src/components/FeaturesSection.js
import React, { useEffect, useState } from 'react';
import { getPlatformLogos } from '../../api';
import './FeatureSection.css';
import Animated from '../Animated';

export default function FeaturesSection() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const result = await getPlatformLogos();
      setLogos(result);
    };

    fetchLogos();
  }, []);

  return (
    <section className="features-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="heading-3 mb-2 text-start">
            <Animated animation="fade-up" delay={100}>Trusted Leading Trading Platforms</Animated>
            </h5>
          </div>
          <div className="logo-slider">
            <div className="slider-track">
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div className="slide" key={index}>
                  <img src={logo.image} alt={`Logo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
