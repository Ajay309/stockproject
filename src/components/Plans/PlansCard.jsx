import React, { useState } from 'react';
import PurchaseForm from '../PurchaseForm/PurchaseForm';
import { useNavigate } from 'react-router-dom';

const PlansCard = ({ plan, isHomePage = false }) => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/purchase', { state: { plan } }); // ✅ Passing plan to purchase page
    };

    return (
        <>
            <div className="container-fluid pricing-container z-0 py-5">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className={`pricing-card ${!isHomePage && plan.featured ? 'featured' : ''} ${plan.name.toLowerCase()}`}>
                            {!isHomePage && plan.featured && <div className="popular-badge">POPULAR</div>}
                            <div className="pricing-card-header">
                                <h3 className="plan-name">{plan.name}</h3>
                               <div className="price text-center">
    {parseFloat(plan.discount_price) > parseFloat(plan.price) && (
        <div className="text-muted text-decoration-line-through" style={{ fontSize: '42px' }}>
            ₹{plan.discount_price}/ {plan.duration}
        </div>
    )}
    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
        <span className="price-currency"></span>
       ₹{plan.price}
        <span className="price-period"> / {plan.duration}</span>
    </div>
</div>

                            </div>
                            <div className="divider"></div>
                            <div className="pricing-card-body">
                                <ul className="feature-list">
                                    <div dangerouslySetInnerHTML={{ __html: plan.features }} />
                                </ul>
                                <div className="button d-flex justify-content-center">
                                    <button className='btn btn-primary' onClick={handleGetStarted}>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlansCard;
