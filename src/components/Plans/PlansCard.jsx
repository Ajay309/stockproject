import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansCard = ({ plan, isHomePage = false }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/purchase', { state: { plan } }); // pass plan to purchase page
    };

    const currencySymbol = plan.currency === 'USD' ? '$' : '₹';

    return (
        <div className="container-fluid pricing-container mt-5 h-100">
            <div className={`pricing-card h-100 d-flex flex-column justify-content-between ${!isHomePage && plan.featured ? 'featured' : ''} ${plan.name.toLowerCase()}`}>
                
                {/* Popular Badge */}
                {!isHomePage && plan.featured && (
                    <div className="popular-badge">POPULAR</div>
                )}

                {/* Plan Header */}
                <div className="pricing-card-header text-center">
                    <h3 className="plan-name fs-1">{plan.name}</h3>

                    {/* Show Original Price with strikethrough if discounted price is valid */}
                    {parseFloat(plan.discount_price) > 0 && parseFloat(plan.discount_price) < parseFloat(plan.price) && (
                        <div className="text-danger text-decoration-line-through fs-5">
                            {currencySymbol}{plan.price}
                        </div>
                    )}

                    {/* Show Discount Price if valid, otherwise show regular price */}
                    <div className="fw-bold" style={{ fontSize: '50px' }}>
                        {currencySymbol}
                        {parseFloat(plan.discount_price) > 0 && parseFloat(plan.discount_price) < parseFloat(plan.price) 
                            ? plan.discount_price 
                            : plan.price
                        }
                        <span className="price-period"></span>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider my-3"></div>

                {/* Features & Button */}
                <div className="pricing-card-body d-flex flex-column flex-grow-1">
                    <div className="flex-grow-1">
                        <ul className="feature-list px-3">
                            <div dangerouslySetInnerHTML={{ __html: plan.features }} />
                        </ul>
                    </div>

                    <div className="button d-flex justify-content-center mt-3">
                        <button className='btn btn-primary w-100 mx-3' onClick={handleGetStarted}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansCard;
