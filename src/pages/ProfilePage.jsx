import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { userProfile, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State to hold potentially more detailed user data if needed
  const [fullUserProfile, setFullUserProfile] = useState(userProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('ProfilePage - userProfile from AuthContext:', userProfile);
  console.log('ProfilePage - authLoading from AuthContext:', authLoading);

  useEffect(() => {
    console.log('ProfilePage useEffect - userProfile:', userProfile);
    // If userProfile from AuthContext doesn't have all details (like subscription)
    // you might need to fetch full user data here.
    // Example (assuming an API endpoint /api/v1/user/profile exists):
    const fetchFullProfile = async () => {
      // Only attempt to fetch if userProfile exists but might not be complete
      if (!userProfile || !userProfile.email) {
         console.log('ProfilePage useEffect - userProfile not available, skipping fetch.');
         // If AuthContext is not loading and userProfile is null, redirect to login
         if (!authLoading && !userProfile) {
             // Consider a small delay or check isAuthenticated flag if available
             // navigate('/login'); 
         }
         return;
      }
      
      // Check if fullUserProfile already has details (to avoid unnecessary fetches)
      // if (fullUserProfile && fullUserProfile.plan) { // Example check
      //   console.log('ProfilePage useEffect - fullUserProfile already complete.');
      //   setLoading(false); // Ensure loading is false if not fetching
      //   return;
      // }

      setLoading(true);
      try {
        console.log('ProfilePage useEffect - Attempting to fetch full profile...');
        // Replace with your actual API call to get full user details
        // const res = await axios.get('/api/v1/user/profile', { params: { email: userProfile.email } });
        // console.log('ProfilePage useEffect - Full profile fetched:', res.data);
        // setFullUserProfile(res.data);

        // For now, just use the profile data from AuthContext
         setFullUserProfile(userProfile); // Assuming AuthContext has latest details
         console.log('ProfilePage useEffect - Using userProfile from AuthContext.', userProfile);

      } catch (err) {
        console.error('ProfilePage useEffect - Error fetching full profile:', err);
        setError('Failed to load full profile details.');
      } finally {
        setLoading(false);
      }
    };

     // Only attempt to fetch if user is logged in and AuthContext is not still loading initially
     if (userProfile && !authLoading) {
        // fetchFullProfile();
     } else if (!authLoading && !userProfile) {
         // Redirect to login if not loading and no userProfile
         // navigate('/login'); 
     }

    // Using data directly from AuthContext for now as the primary source
    // This will update fullUserProfile whenever userProfile from context changes
    setFullUserProfile(userProfile);

  }, [userProfile, authLoading]); // Rerun if userProfile or authLoading changes

  // Show loading state if AuthContext is still loading the user
  if (authLoading) {
      console.log('ProfilePage - Showing Auth Loading...');
      return <div className="container mt-5">Loading user session...</div>;
  }

  // Show message if no user profile is available after auth loading
  if (!userProfile) {
      console.log('ProfilePage - No userProfile, showing login message.');
      // Optional: Redirect to login after a short delay if userProfile is still null
      // setTimeout(() => navigate('/login'), 2000);
      return <div className="container mt-5">Please log in to view your profile.</div>;
  }

  // Use the state that holds potentially more complete data, falling back to context data
  const displayProfile = fullUserProfile || userProfile;

  console.log('ProfilePage - displayProfile name:', displayProfile.name);

  if (loading) {
    console.log('ProfilePage - Showing Fetch Loading...');
    return <div className="container mt-5">Loading profile details...</div>;
  }

  if (error) {
    console.log('ProfilePage - Showing Error:', error);
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  // Final render using displayProfile
  return (
    <div className="container mt-5 py-5" style={{ paddingTop: '120px' }}>
      <h2 className="mb-4 text-center" style={{ fontWeight: 700, letterSpacing: '-1px', marginTop: '40px', fontSize: '2.5rem' }}>User Profile</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: '600px' }}> {/* Limit card width and center */}
        {/* Basic Info: Name and Email */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2 mb-md-0">
            <strong>Name:</strong> <span style={{ wordBreak: 'break-word' }}>{displayProfile.name || 'N/A'}</span>
          </div>
          <div className="col-md-6">
            <strong>Email:</strong> <span style={{ wordBreak: 'break-word' }}>{displayProfile.email}</span>
          </div>
        </div>
        {/* Subscription Details - always show section */}
        <div className="border-top pt-3 mt-3">
          <h5 className="mb-3" style={{ fontWeight: 600 }}>Subscription Details</h5>
          {displayProfile.plan ? (
            <div className="mb-2">
              <strong>Plan:</strong> {displayProfile.plan}
            </div>
          ) : (
            <div className="text-muted">No active subscription found.</div>
          )}
          {displayProfile.planEndDate && (
            <div>
              <strong>Plan Ends:</strong> {displayProfile.planEndDate}
            </div>
          )}
        </div>
        {/* Actions: Change Password */}
        <div className="mt-4">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/change-password')}
          >
            Change Password
          </button>
        </div>
        {/* Add other profile details here as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;