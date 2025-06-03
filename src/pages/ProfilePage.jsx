import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { userProfile, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [userPayments, setUserPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user payments
  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        if (!userProfile || !userProfile.id) {
          setError('User ID not found.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://dtc.sinfode.com/api/v1/user-payments/${userProfile.id}`);
        setUserPayments(response.data);
      } catch (err) {
        console.error('Error fetching user payments:', err);
        setError('Failed to load user payment data.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && userProfile) {
      fetchUserPayments();
    }
  }, [authLoading, userProfile]);

  // UI Conditions
  if (authLoading) {
    return <div className="container mt-5">Loading user session...</div>;
  }

  if (!userProfile) {
    return <div className="container mt-5">Please log in to view your profile.</div>;
  }

  if (loading) {
    return <div className="container mt-5">Loading profile details...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  // Filter for successful payments
  const successfulPayments = userPayments.filter(payment => payment.status === 'success');
  const hasSuccessfulPayment = successfulPayments.length > 0;

  return (
    <div className="container mt-5 py-5" style={{ paddingTop: '120px' }}>
      <h2 className="mb-4 text-center" style={{ fontWeight: 700, letterSpacing: '-1px', fontSize: '2.5rem' }}>
        User Profile
      </h2>

      <div className="card p-4 mx-auto" style={{ maxWidth: '600px' }}>
        {/* Basic Info */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2 mb-md-0">
            <strong>Name:</strong> <span>{userProfile.name || 'N/A'}</span>
          </div>
          <div className="col-md-6">
            <strong>Email:</strong> <span>{userProfile.email || 'N/A'}</span>
          </div>
        </div>

        {/* Subscription Details */}
        {hasSuccessfulPayment ? (
          <>
            <div className="mb-2">
              <strong>Plan:</strong> {successfulPayments[0].plan_name}
            </div>
            <div>
              <strong>Plan Ends:</strong> {new Date(successfulPayments[0].end_date).toLocaleDateString()}
            </div>
          </>
        ) : (
          <div className="text-muted">No active subscription found.</div>
        )}

        {/* WhatsApp Button */}
        {hasSuccessfulPayment && (
          <div className="mt-4 text-center">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              📱 Contact Us on WhatsApp
            </a>
          </div>
        )}

        {/* Payment History */}
        <div className="border-top pt-3 mt-4">
          <h5 className="mb-3" style={{ fontWeight: 600 }}>Payment History</h5>
          {userPayments.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {userPayments.map((payment) => (
                  <tr key={payment.id || payment.order_id}>
                    <td>{payment.plan_name}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.status}</td>
                    <td>{new Date(payment.start_date).toLocaleDateString()}</td>
                    <td>{new Date(payment.end_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No payment history found.</p>
          )}
        </div>

        {/* Change Password Button */}
        <div className="mt-4">
          <button className="btn btn-primary" onClick={() => navigate('/change-password')}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
