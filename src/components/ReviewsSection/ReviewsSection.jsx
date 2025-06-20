import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ReviewsSection.css';
import { color } from 'framer-motion';
import { getTestimonials } from '../../api'; // adjust path as needed


const ReviewsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTestimonials();
  }, []);
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className="star-icon"
        color={index < rating ? "#f6b40e" : "#e4e5e9"}
        size={20}
      />
    ));
  };

  return (
    <div id="review" className="container my-5">
      <h2 className="heading-3 mb-2 display-3 text-start text-black">What Our Customers Say</h2>
      {/* <button className="btn btn-primary rounded-pill mb-5">
        See All Case Study
      </button> */}
      {loading ? (
        <p>Loading testimonials...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="review-slide bg-white rounded ">
              <div className="row align-items-center">
                {/* Left Section - Image and Info */}
                <div className="col-md-4 text-center mb-4 mb-md-0 left-section">
                  {/* Container for circular image */}
                  <div className="client-image-container mb-3">
                    <img src={testimonial.image} alt="Client Image" className="client-image" />
                  </div>
                  {/* Name and Department below the image */}
                  {/* <h6 className="text-muted mb-1">Name</h6> */}
                  <h5 className="font-weight-bold head mb-3">{testimonial.name}</h5>
                  {/* <h6 className="text-muted mt-3 mb-1">Department</h6> */}
                  <h5 className="font-weight-bold head">{testimonial.department}</h5>
                  {/* Add rating stars */}
                  <div className="rating-stars mb-3">
                    {renderStars(testimonial.rating || 5)}
                  </div>
                </div>

                {/* Right Section - Testimonial */}
                <div className="col-md-8 p-4 py-2 testimonial-content">
                  <blockquote className="blockquote mb-4">
                    {testimonial.feedback}
                  </blockquote>
                  {/* <div className="button d-flex justify-content-end mt-5">
                    <button className="btn btn-primary rounded-pill  mt-3">
                      Read Case Study
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ReviewsSection;
