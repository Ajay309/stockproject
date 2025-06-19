import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansCard = ({ plan, isHomePage = false }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/purchase', { state: { plan } }); // pass plan to purchase page
    };

    const currencySymbol = plan.currency === 'USD' ? '$' : '₹';

    return (
        <div className=" container-fluid pricing-container mt-5  h-100">
            <div className={`pricing-card h-100 d-flex flex-column justify-content-between ${!isHomePage && plan.featured ? 'featured' : ''} ${plan.name.toLowerCase()}`}>
                {!isHomePage && plan.featured && <div className="popular-badge">POPULAR</div>}

                <div className="pricing-card-header text-center">
                    <h3 className="plan-name fs-1">{plan.name}</h3>

                    {/* Show discount only if it's lower than price */}
                    {parseFloat(plan.discount_price) > 0 &&
                        parseFloat(plan.discount_price) > parseFloat(plan.price) && (
                            <div className="text-danger text-decoration-line-through fs-5">
                                {currencySymbol}{plan.discount_price}
                            </div>
                        )}

                    <div className="fw-bold" style={{ fontSize: '32px' }}>
                        {currencySymbol}
                            {plan.price}
                        <span className="price-period"></span>
                    </div>
                </div>

                <div className="divider my-3"></div>

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
