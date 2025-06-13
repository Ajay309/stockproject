import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansCard = ({ plan, isHomePage = false }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/purchase', { state: { plan } }); // pass plan to purchase page
    };

    // Get currency symbol based on backend value
    const currencySymbol = plan.currency === 'USD' ? '$' : '₹';

    return (
        <div className="container-fluid pricing-container z-0 py-5">
            <div className="row g-4">
                <div className="col-lg-12">
                    <div className={`pricing-card ${!isHomePage && plan.featured ? 'featured' : ''} ${plan.name.toLowerCase()}`}>
                        {!isHomePage && plan.featured && <div className="popular-badge">POPULAR</div>}

                        <div className="pricing-card-header">
                            <h3 className="plan-name fs-1">{plan.name}</h3>
                            <div className="price text-center">
                                {/* Show discount only if it's lower than price */}
                                {parseFloat(plan.discount_price) > 0 &&
                                    parseFloat(plan.discount_price) < parseFloat(plan.price) && (
                                        <div
                                            className="text-muted text-decoration-line-through"
                                            style={{ fontSize: '42px' }}
                                        >
                                            {currencySymbol}{plan.price}
                                        </div>
                                    )}

                                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                                    {currencySymbol}{parseFloat(plan.discount_price) > 0 && parseFloat(plan.discount_price) < parseFloat(plan.price)
                                        ? plan.discount_price
                                        : plan.price}
                                    <span className="price-period"> / {plan.validity_days} days</span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="pricing-card-body">
                            <ul className="feature-list">
                                <div dangerouslySetInnerHTML={{ __html: plan.features }} />
                            </ul>
                            <div className="button d-flex justify-content-center">
                                <button className="btn btn-primary" onClick={handleGetStarted}>Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansCard;
