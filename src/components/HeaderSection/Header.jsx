import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional for custom styles

export default function HeaderSection() {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetch('https://dtc.sinfode.com/api/v1/slider')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success' && data.data) {
          setSliderImages(data.data.map(item => item.image));
        }
      })
      .catch(error => console.error('Slider API error:', error));
  }, []);

  useEffect(() => {
    if (sliderImages.length > 0) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % sliderImages.length);
          setIsTransitioning(false);
        }, 800); // Match this with CSS transition duration
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [sliderImages]);

  return (
    <div>
      {/* Hero Section */}
      <section className="container-fluid bg-black py-5">
        <div className="row py-5 justify-content-center align-items-center">
          <div className="col-lg-8 text-center text-lg-start">
            <h1 className="display-4 pt-5 text-center text-white mb-3">
              MAKE YOUR <span className='text-warning'>TRADING</span> BETTER
            </h1>
            <p className="lead text-white mb-4 text-center">
              Track your stocks, analyze trends, and make smart decisions with real-time insights. 
              Empower your trading with our easy-to-use platform.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-center gap-3">
              <Link to="/plans" className="btn btn-outline-warning btn-lg px-4 rounded-pill">View Plans</Link>
              <Link to="/get-started" className="btn btn-warning btn-lg px-4 rounded-pill">Get Started</Link>
            </div>
          </div>
          <section className="py-4 rounded-3 mt-3" style={{ width: '100%', maxWidth: '100%' }}>
        <div className="container text-center">
          <div className="ratio ratio-16x9 rounded-4 shadow-lg overflow-hidden">
           <img src="/assets/images/istockphoto-1487894858-612x612.jpg" alt="" />
          </div>
        </div>
      </section>
        </div>
      </section>
    </div>
  );
}
