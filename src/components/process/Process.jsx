import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react'; // Optional icon lib
import './Process.css'; // Optional for custom styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const cards = [
  
  {
    title: 'Creative production',
    desc: 'Accelerate creative work by automating workflows from start to finish.',
    link: 'See creative production'
  },
//   {
//     title: 'Project intake',
//     desc: 'Capture, prioritize, and assign requests automatically so your teams have more time to work.',
//     link: 'See project intake'
//   },
  {
    title: 'Product launches',
    desc: 'Coordinate teams, tasks, and timelines to keep every launch on schedule.',
    link: 'See project launches'
  },
  {
    title: 'Product launches',
    desc: 'Coordinate teams, tasks, and timelines to keep every launch on schedule.',
    link: 'See project launches'
  },
  {
    title: 'Product launches',
    desc: 'Coordinate teams, tasks, and timelines to keep every launch on schedule.',
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
      <button className="btn  btn-dark rounded-circle position-absolute bottom-50 translate-middle-y me-2" onClick={onClick}>
        <ArrowRight size={20} />
      </button>
    );
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="btn  btn-light rounded-circle position-absolute  bottom-50 translate-middle-y ms-2" onClick={onClick}>
        <ArrowLeft size={20} />
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
    <section className="py-5 bg-white">
    <div className="container">
      <div className=" mb-5">
        <div className="row">
        <div className="col-lg-6">
        <h2 className="  heading-3">
          See how Asana keeps work moving across use cases
        </h2>
        </div>
      </div>
      <Slider {...sliderSettings}>
          {cards.map((card, index) => (
            <div key={index} className="step-card mb-4 p-4 g-4 rounded  ">
            {/* <div key={index} className="p-3"> */}
              <div className="vertical-card p-4 h-100 rounded bg-white ">
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
