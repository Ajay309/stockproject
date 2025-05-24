import React, { useState } from 'react';
import PurchaseForm from '../PurchaseForm/PurchaseForm';
import { useNavigate } from 'react-router-dom';

const PlansCard = ({ plan }) => {
    const navigate = useNavigate();
const handleGetStarted = () => {
    navigate('/purchase', { state: { plan } }); // ✅ Passing plan to purchase page
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="container-fluid pricing-container z-0 py-5">
        <div className="row g-4">
          <div className="col-lg-12">
            <div className={`pricing-card ${plan.featured ? 'featured' : ''} ${plan.name.toLowerCase()}`}>
              {plan.featured && <div className="popular-badge">POPULAR</div>}
              <div className="pricing-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="price">
                  <span className="price-currency">$</span>
                  {plan.price}
                  <span className="price-period">{plan.duration}</span>
                </div>
                <p className="plan-description">{plan.features}</p>
              </div>
              <div className="divider"></div>
              <div className="pricing-card-body">
                <ul className="feature-list">
                  <li className={plan.features}>
                    <i className={`fas ${plan.features}`}></i>
                  </li>
                </ul>
                <button className='btn btn-primary' onClick={handleGetStarted}>Get Started</button>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PlansCard;
