// src/components/HeaderSection.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSliderImages } from '../../api';
import './Home.css'; // or HeaderSection.css if renamed

export default function HeaderSection() {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch slider data once
  useEffect(() => {
    (async () => {
      const images = await getSliderImages();
      setSliderImages(images);
    })();
  }, []);

  // Auto slider logic
  useEffect(() => {
    if (!sliderImages.length) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % sliderImages.length);
        setIsTransitioning(false);
      }, 800); // match transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages]);

  return (
    <section className="container-fluid bg-black py-5">
      <div className="row py-5 justify-content-center align-items-center">
        <div className="col-lg-8 text-center text-lg-start">
          <h1 className="display-4 pt-5 text-center text-white mb-3">
            MAKE YOUR <span className="text-warning">TRADING</span> BETTER
          </h1>
          <p className="lead text-white mb-4 text-center">
            Track your stocks, analyze trends, and make smart decisions with real-time insights.
            Empower your trading with our easy-to-use platform.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/plans" className="btn btn-outline-warning btn-lg px-4 rounded-pill">View Plans</Link>
            <Link to="/get-started" className="btn btn-warning btn-lg px-4 rounded-pill">Get Started</Link>
          </div>
        </div>

        <div className="py-4 rounded-3 mt-3 w-100">
          <div className="container text-center">
            <div className="ratio ratio-16x9 rounded-4 shadow-lg overflow-hidden">
              {(sliderImages.length > 0 ? sliderImages : ['/assets/images/istockphoto-1487894858-612x612.jpg'])
                .map((image, index, arr) => {
                  const active = index === currentIndex;
                  const prev = (index === (currentIndex - 1 + arr.length) % arr.length);
                  const show = active || prev;
                  return (
                    <img
                      key={index}
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className={`slider-image ${active ? 'active' : ''}`}
                      style={{ display: show ? 'block' : 'none' }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
