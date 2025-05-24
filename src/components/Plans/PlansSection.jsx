// src/components/PlansSection.jsx
import React, { useState, useEffect } from 'react';
import { getPackages, getPlans } from '../../api'; // Import named exports
import PlansCard from './PlansCard'; // Assume you have this component
import './PlansSection.css'; // Import your CSS file

const PlansSection = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const data = await getPackages();
        setPackages(data);
        if (data.length > 0) {
          setSelectedPackage(data[0]); // Select first package by default
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
          const data = await getPlans(selectedPackage.id);
          setPlans(data);
        } catch (err) {
          setError('Failed to load plans');
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
    }
  }, [selectedPackage]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;


  return (

    
    <div className="">
<header className="pricing-header text-center py-5">
        <div className="container">
          <h1 className="display-4">Elevate Your Experience</h1>
          <p>Choose the perfect plan tailored to your needs and unlock premium features designed to help you succeed.</p>
        </div>
      </header>

      {/* Package Tabs */}
      <div className="d-flex justify-content-center space-x-4 gs-3 mt-4 mb-6">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            className={`px-4 py-2 rounded ${
              selectedPackage?.id === pkg.id ? 'bg-warning text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      {/* Plans Display */}
      {selectedPackage && (
        <div>
          <h2 className="text-2xl text-center mt-3 font-semibold mb-4">{selectedPackage.name} Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 d-flex">
            {plans.map((plan) => (
              <PlansCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansSection;