import React from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ReviewsSection.css';
import { color } from 'framer-motion';

const testimonials = [
  
  
  {
    logo: '/assets/images/client1.jpg',
    companySize: 'Mid-size',
    industry: 'Finance/Trading',
    quote: '“The trading engine is fast and reliable, ensuring that my orders are executed quickly, even during high volatility periods.”',
    name: 'Emily Davis',
    position: 'Day Trader'
  },
  {
    logo: '/assets/images/client3.png',
    companySize: 'Mid-size',
    industry: 'Finance/Trading',
    quote: '“Two-factor authentication and cold storage options provide the security and peace of mind I need for my investments.”',
    name: 'Mark Johnson',
    position: 'Crypto Investor'
  },
  {
    logo: '/assets/images/client4.png',
    companySize: 'Mid-size',
    industry: 'Finance/Trading',
    quote: '“The mobile app is perfect for monitoring my trades and portfolio on the go, with push notifications for order updates.”',
    name: 'Lisa Brown',
    position: 'Retail Investor'
  },
  
];


const ReviewsSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: true,
    prevArrow: <FiChevronLeft size={40} className="slick-prev" />,
    nextArrow: <FiChevronRight size={40} className="slick-next" />,
  };

  return (
    <div className="container my-5">
        <h2 className="heading-3 mb-2 display-3 text-start text-black">What Our Customers Say</h2>
         <button className="btn btn-primary rounded-pill mb-5">
                  See All Case Study
                </button>
      <Slider {...sliderSettings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="review-slide bg-white ">
            <div className="row">
              {/* Left Section - Logo and Company Info */}
              <div className="col-md-4 text-center mb-4 mb-md-0 left-section">
                <img src={testimonial.logo} alt="Company Logo" className="img-fluid mb-3" style={{ Width: '100%' , height:'400px' }} />
                <h6 className="text-muted mb-2">Name</h6>
                <h5 className="font-weight-bold head">{testimonial.name}</h5>
                <h6 className="text-muted mt-3 mb-2">Postition</h6>
                <h5 className="font-weight-bold head">{testimonial.position}</h5>
              </div>

              {/* Right Section - Testimonial */}
              <div className="col-md-8  p-4  py-2 testimonial-content">
                <blockquote className="blockquote  heading-14 mb-4">
                  {testimonial.quote}
                </blockquote>
                {/* <p className="font-weight-bold ps-4" style={{color: "white" , fontFamily:"monospace"}}>{testimonial.name}</p>
                <p className=" ps-4" style={{color: "white"}}>{testimonial.position}</p> */}
                <div className="button d-flex justify-content-end mt-5">
                <button className="btn btn-primary rounded-pill  mt-3">
                  Read Case Study
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsSection;
