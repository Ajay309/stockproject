import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import './NotFound.css'; // We'll put your custom styles here

// Particle Effect Component
const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const hexagonPositions = [
      { top: '20%', left: '10%', delay: '0s' },
      { top: '60%', left: '80%', delay: '2s' },
      { top: '80%', left: '20%', delay: '4s' },
      { top: '30%', left: '70%', delay: '1s' },
      { top: '50%', left: '5%', delay: '3s' },
    ];

    const additionalParticles = [];
    for (let i = 0; i < 3; i++) {
      additionalParticles.push({
        id: `particle-${i}`,
        width: '6px',
        height: '6px',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        animationDuration: `${4 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 2}s`
      });
    }

    setParticles({ hexagons: hexagonPositions, dots: additionalParticles });
  }, []);

  return (
    <div className="floating-elements">
      {particles.hexagons?.map((hex, idx) => (
        <div
          key={`hex-${idx}`}
          className="hexagon"
          style={{ top: hex.top, left: hex.left, animationDelay: hex.delay }}
        />
      ))}
      {particles.dots?.map(dot => (
        <div
          key={dot.id}
          className="particle"
          style={{
            width: dot.width,
            height: dot.height,
            top: dot.top,
            left: dot.left,
            animationDuration: dot.animationDuration,
            animationDelay: dot.animationDelay
          }}
        />
      ))}
    </div>
  );
};

// Animated Bee Component
const AnimatedBee = () => <span className="bee-emoji">🐝</span>;

// Action Buttons Component
const ActionButtons = ({ onGoHome, onGoBack }) => (
  <div className="action-buttons">
    <button className="btn-primary-custom" onClick={onGoHome}>
      <i className="fas fa-home"></i> Back to Home
    </button>
    <button className="btn-secondary-custom" onClick={onGoBack}>
      <i className="fas fa-arrow-left"></i> Go Back
    </button>
  </div>
);

// Main 404 Page Component
const NotFound = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/'; // Redirect to homepage
  };

  const handleGoBack = () => {
    if (window.history.length > 1) window.history.back();
    else handleGoHome();
  };

  return (
    <section className="error-section">
      <ParticleEffect />

      <div className="container">
        <div className={`error-container ${isLoaded ? 'loaded' : ''}`}>
          <div className="error-number">
            404
            <AnimatedBee />
          </div>

          <h1 className="error-title">Oops! Page Not Found</h1>

          <p className="error-subtitle">
            Looks like this page flew away like a busy bee! Don't worry, we'll help you
            find your way back to the sweet content you're looking for.
          </p>

          <ActionButtons onGoHome={handleGoHome} onGoBack={handleGoBack} />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
