// src/components/FeaturesSection.js
import React, { useEffect, useState } from 'react';
import { getPlatformLogos } from '../../api';
import './FeatureSection.css';

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
            <h5 className="heading-3 mb-5">
              Trusted Leading Trading Platforms
            </h5>
          </div>
          <div className="logo-slider">
            <div className="slider-track">
              {[...logos, ...logos].map((logo, index) => (
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
