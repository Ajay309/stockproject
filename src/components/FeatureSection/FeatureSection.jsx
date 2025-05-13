import React from 'react';
import './FeatureSection.css'; // Optional for extra styl

const logos = [
  { src: '/assets/logos/forex.png', alt: 'Amazon' },
  { src: '/assets/logos/nyse.png', alt: 'Accenture' },
  { src: '/assets/logos/nse.png', alt: 'Johnson & Johnson' },
  { src: '/assets/logos/bse.png', alt: 'Dell' },
  { src: '/assets/logos/nyse.png', alt: 'Accenture' },
];
export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
        <h5 className="heading-2  mb-5">
          Trusted by Leading Trading Platforms and Financial Institutions
        </h5>
        </div>
        <div className="logo-slider">
          <div className="slider-track">
            {[...logos, ...logos].map((logo, index) => (
              <div className="slide" key={index}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
