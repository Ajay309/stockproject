import React from 'react';
import './PlansSection.css'; // Import your CSS file for custom styles
import { FaRocket, FaCrown, FaGem, FaCheck, FaTimes, FaShieldAlt } from 'react-icons/fa';



const PlansSection = () => {
  const plans = [
  {
    name: 'Essential',
    icon: <FaGem/>,
    badge: 'STARTER',
    price: 19,
    period: '/mo',
    description: 'Perfect for individuals and small projects',
    features: [
      '5 Projects',
      '20GB Storage',
      'Basic Support',
      'Email Notifications',
      'Custom Domain',
      'Advanced Analytics',
      'Priority Support',
    ],
    unavailable: [4, 5, 6],
    featured: false,
  },
  {
    name: 'Professional',
    badge: 'RECOMMENDED',
    price: 49,
    period: '/mo',
    description: 'Ideal for growing businesses and teams',
    features: [
      '15 Projects',
      '50GB Storage',
      'Priority Support',
      'Email Notifications',
      'Custom Domain',
      'Advanced Analytics',
      'White Labeling',
    ],
    unavailable: [6],
    featured: false,
  },
  {
    name: 'Enterprise',
    icon: <FaGem/>,
    badge: 'PREMIUM',
    price: 99,
    period: '/mo',
    description: 'Advanced features for large organizations',
    features: [
      'Unlimited Projects',
      '200GB Storage',
      '24/7 Premium Support',
      'Email Notifications',
      'Custom Domain',
      'Advanced Analytics',
      'White Labeling',
    ],
    unavailable: [],
    featured: false,
  },
];

  return (
    <div>
      
      <header className="pricing-header text-center py-5">
        <div className="container">
          <h1 className="display-4">Elevate Your Experience</h1>
          <p>Choose the perfect plan tailored to your needs and unlock premium features designed to help you succeed.</p>
        </div>
      </header>

      <div className="container pricing-container z-0">
        <div className="row g-4">
          {plans.map((plan, index) => (
            <div className="col-lg-4" key={index}>
              <div className={`pricing-card ${plan.featured ? 'featured' : ''} ${plan.name.toLowerCase()}`}>
                {plan.featured && <div className="popular-badge">POPULAR</div>}
                <div className="pricing-card-header">
                  <div className="plan-badge">{plan.badge}</div>
                  
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="price">
                    <span className="price-currency">$</span>
                    {plan.price}
                    <span className="price-period">{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <div className="divider"></div>
                <div className="pricing-card-body">
                  <ul className="feature-list">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={plan.unavailable.includes(i) ? 'unavailable' : ''}>
                        <i className={`fas ${plan.unavailable.includes(i) ? 'fa-xmark' : 'fa-check'}`}></i> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`btn ${plan.featured ? 'btn-accent' : 'btn-primary'} btn-pricing`}>Get Started</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pricing-footer text-center mt-5 pb-5">
          <p>All plans include a 14-day free trial. No credit card required.</p>
          <a href="#" className="contact-link">Need a custom plan? Contact our sales team</a>
          <div className="guarantee-badge mt-3">
            <i className="fas fa-shield-alt"></i>
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlansSection;
