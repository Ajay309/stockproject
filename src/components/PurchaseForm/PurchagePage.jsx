import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PurchaseForm from './PurchaseForm';

const PurchasePage = () => {
  const { packageId, planId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`https://admin.dtctradingclub.com/api/v1/packages/${packageId}/plans`);
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          const plan = result.data.find((p) => p.id === parseInt(planId));
          setSelectedPlan(plan || null);
        } else {
          setSelectedPlan(null);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        setSelectedPlan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [packageId, planId]);

  if (loading) return <p>Loading plan...</p>;
  if (!selectedPlan) return <p>❌ Plan not found.</p>;

  return (
    <PurchaseForm plan={selectedPlan} onClose={() => window.history.back()} />
  );
};

export default PurchasePage;
