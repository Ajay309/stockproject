import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { userProfile } = useAuth();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userProfile || !userProfile.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://dtc.sinfode.com/api/v1/user-payments/${userProfile.id}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPaymentData(response.data[0]);
          setErrorMsg('');
        } else {
          setPaymentData(null);
          setErrorMsg('No payment history found.');
        }
      } catch (error) {
        setErrorMsg('Failed to fetch payment data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userProfile]);

  const openWhatsApp = () => {
    if (!paymentData?.phone) {
      alert('Phone number not available for WhatsApp.');
      return;
    }
    const phone = paymentData.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${userProfile?.name}, thank you for your payment for the plan: ${paymentData.plan_name}.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (loading) return <div style={styles.loading}>Loading profile...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading} className='text-warning'>User Profile</h2>

        <p style={styles.info}><strong>Name:</strong> {userProfile?.name || 'N/A'}</p>
        <p style={styles.info}><strong>Email:</strong> {userProfile?.email || 'N/A'}</p>

        <hr style={styles.divider} />

        <h3 style={styles.subheading}className='text-warning'>Subcription Details</h3>

        {errorMsg ? (
          <p style={styles.error}>{errorMsg}</p>
        ) : paymentData ? (
          <>
            <p><strong>Plan Name:</strong> <span style={styles.highlight}>{paymentData.plan_name || 'N/A'}</span></p>
            <p><strong>Plan End Date:</strong> <span style={styles.highlight}>{paymentData.end_date ? new Date(paymentData.end_date).toLocaleDateString() : 'N/A'}</span></p>
            <p>
              <strong>Status:</strong>{' '}
              <span style={{ color: paymentData.status === 'success' ? '#28a745' : '#dc3545', fontWeight: '700' }}>
                {paymentData.status}
              </span>
            </p>

            {paymentData.status === 'success' && (
              <button onClick={openWhatsApp} style={styles.whatsappButton} aria-label="Send WhatsApp Message">
                📱 Send WhatsApp Message
              </button>
            )}
          </>
        ) : (
          <p style={styles.info}>No payment data available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 50px',
    borderRadius: 20,
    marginTop: 40,
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    maxWidth: 550,
    width: '100%',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  heading: {
    marginBottom: 30,
    fontSize: '2.2rem',
    letterSpacing: '1px',
    fontWeight: '700',
  },
  info: {
    fontSize: '1.1rem',
    margin: '12px 0',
    color: '#444',
  },
  divider: {
    margin: '30px 0',
    border: 'none',
    borderTop: '2px solid #eee',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: 20,
    color: '#5a2a83',
    fontWeight: '600',
  },
  highlight: {
    color: '#764ba2',
    fontWeight: '600',
  },
  error: {
    color: '#e63946',
    fontWeight: '700',
    fontSize: '1rem',
  },
  whatsappButton: {
    marginTop: 30,
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    padding: '12px 35px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(37, 211, 102, 0.6)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    userSelect: 'none',
  },
  loading: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: '600',
  },
};

// Optional: Hover effect on WhatsApp button using React inline styles (not possible directly, but can do with CSS classes in your app)

export default ProfilePage;
