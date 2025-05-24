import React from 'react';
import PurchaseForm from '../components/PurchaseForm/PurchaseForm';
import { useLocation, useNavigate } from 'react-router-dom';

const PurchaseFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get plan passed from previous page
  const plan = location.state?.plan;

  if (!plan) {
    return <div>No plan selected. <button onClick={() => navigate('/')}>Go Home</button></div>;
  }

  return (
    <div className="container py-5">
      <PurchaseForm plan={plan} onClose={() => navigate('/')} />
    </div>
  );
};

export default PurchaseFormPage;
