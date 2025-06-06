// src/components/PlansSection.jsx 
import React, { useState, useEffect } from 'react';
import { getPackages, getPlans } from '../../api'; // Import named exports
import PlansCard from './PlansCard'; // Assume you have this component
import './PlansSection.css'; // Import your CSS file
import { useLocation } from 'react-router-dom';
import Timer from './Timer';

const PlansSection = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const data = await getPackages();
        setPackages(data);
        if (data.length > 0) {
          setSelectedPackage(data[0]);
        }
      } catch (err) {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Fetch plans when selectedPackage changes
  useEffect(() => {
    if (selectedPackage) {
      const fetchPlans = async () => {
        setLoading(true);
        try {
          const response = await getPlans(selectedPackage.id);
          console.log('Fetched plans:', response);
          const actualPlans = Array.isArray(response)
            ? response
            : response?.data || [];
          setPlans(actualPlans);
        } catch (err) {
          setError('Failed to load plans');
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
    }
  }, [selectedPackage]);

  const filteredPlans = Array.isArray(plans)
    ? plans.filter((plan) => plan.duration.toLowerCase() === selectedDuration)
    : [];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className={`${isHomePage ? "container py-5 plans-section-homepage" : "py-5"}`}>
      {!isHomePage && (
        <header className="pricing-header text-center py-5">
          <h1 className="display-4">Elevate Your Experience</h1>
          <p>Choose the perfect plan tailored to your needs and unlock premium features designed to help you succeed.</p>
        </header>
      )}

      {/* Timer Section */}
      <div className="container">
        <Timer />
      </div>

      {/* Package Tabs */}
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            className={`plan-tabs-btn${selectedPackage?.id === pkg.id ? ' selected' : ''}`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      {/* Toggle for Duration */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn btn-outline-warning ${selectedDuration === 'monthly' ? 'active' : ''}`}
          onClick={() => setSelectedDuration('monthly')}
        >
          Monthly
        </button>
        <button
          className={`btn btn-outline-warning ${selectedDuration === 'annually' ? 'active' : ''}`}
          onClick={() => setSelectedDuration('annually')}
        >
          Annually
        </button>
      </div>

      {/* Plans Display */}
      {selectedPackage && (
        <div>
          <div className="row">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="col-md-4 mb-4">
                <PlansCard plan={plan} isHomePage={isHomePage} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansSection;
