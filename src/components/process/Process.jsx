import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react'; // Optional icon lib
import './Process.css'; // Optional for custom styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const cards = [
  
  {
    title: 'Choose Your Subscription Plan',
    desc: 'Visit our website and select the best-suited DTC Indicator subscription plan based on your trading needs. Complete the secure payment process.',
    link: 'See creative production'
  },
//   {
//     title: 'Project intake',
//     desc: 'Capture, prioritize, and assign requests automatically so your teams have more time to work.',
//     link: 'See project intake'
//   },
  {
    title: 'Share Your TradingView Username',
    desc: 'After payment, you will be automatically redirected to our DTC Support Team. Simply share your TradingView username with our team to activate access.',
    link: 'See project launches'
  },
  {
    title: 'Access DTC Indicator on TradingView',
    desc: 'Within 2-3 minutes, your TradingView account will get access to the DTC Indicator. Go to the "Invite-only scripts" section under Indicators on TradingView - you will find DTC Indicator listed there.',
    link: 'See project launches'
  },
  {
    title: 'Get Educational Course & Support',
    desc: 'Our team will send you the complete educational video course, PDF guides, and lifetime WhatsApp support on your registered email and WhatsApp number.',
    link: 'See project launches'
  },
  
];

const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // You can change to 2 or 3 based on screen size
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow next-arrow" onClick={onClick} aria-label="Next">
        <ArrowRight size={22} />
      </button>
    );
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow prev-arrow" onClick={onClick} aria-label="Previous">
        <ArrowLeft size={22} />
      </button>
    );
  };

export default function Process() {
  const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     const { current } = scrollRef;
//     if (current) {
//       current.scrollBy({ left: direction === 'right' ? 400 : -400, behavior: 'smooth' });
//     }
//   };

  return (
    <section id="process" className="py-5 bg-white ">
    <div className="container">
      <div className=" mb-5">
        <div className="row">
        <div className="col-lg-12">
        <h2 className="heading-3">
          How to Use DTC indicator setup</h2>
        </div>
      </div>
      <Slider {...sliderSettings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
          {cards.map((card, index) => (
            <div key={index} className="step-card mb-4 p-4 g-4 rounded  ">
            {/* <div key={index} className="p-3"> */}
              <div className="vertical-card p-4 h-100 rounded bg-white  ">
              <div className="step-number mb-2 text-dark">Step {index + 1}</div>

                <h5 className="fw-bold heading-6 mb-2">{card.title}</h5>
                <p className="text-muted heading-7 mb-2">{card.desc}</p>
                <div className="text-primary fw-medium">{card.link}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    
  </section>
  );
}
