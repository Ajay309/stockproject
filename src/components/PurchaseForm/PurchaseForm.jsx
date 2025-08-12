import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './PurchaseForm.css';
import Animated from '../Animated.jsx';

const PurchaseForm = () => {
  const { packageId, planId } = useParams();
  const { userProfile } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [countryCodes, setCountryCodes] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  // Fetch plan data
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`https://admin.dtctradingclub.com/api/v1/packages/${packageId}/plans`);
        const result = await res.json();
        const found = result.data.find((p) => String(p.id) === String(planId));
        if (found) {
          setPlan(found);
        } else {
          alert('❌ Plan not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading plan:', error);
        alert('❌ Failed to fetch plan.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [packageId, planId, navigate]);

  // Fetch country codes
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
        const data = await res.json();
        const codes = data
          .map((country) => {
            const root = country.idd?.root;
            const suffix = country.idd?.suffixes?.[0];
            if (root && suffix) {
              return {
                name: country.name.common,
                code: root + suffix,
              };
            }
            return null;
          })
          .filter((item) => item !== null)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountryCodes(codes);
      } catch (err) {
        console.error('Error fetching country codes:', err);
      }
    };
    fetchCountryCodes();
  }, []);

  const validateCoupon = async () => {
    if (!coupon.trim()) {
      setCouponData(null);
      setIsCouponValid(null);
      return;
    }

    setLoadingCoupon(true);
    try {
      const res = await fetch('https://admin.dtctradingclub.com/api/v1/coupon');
      const result = await res.json();

      const found = result.data.find(
        (c) =>
          c.code.toLowerCase() === coupon.trim().toLowerCase() &&
          c.is_active === 1 &&
          new Date(c.expire_at) > new Date() &&
          (c.plan_id === plan.id || c.package_id === plan.package_id)
      );

      if (found) {
        setCouponData(found);
        setIsCouponValid(true);
      } else {
        setCouponData(null);
        setIsCouponValid(false);
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setIsCouponValid(false);
      setCouponData(null);
    } finally {
      setLoadingCoupon(false);
    }
  };

  const calculateDiscountedPrice = () => {
    if (!couponData) return plan.discount_price;
    if (couponData.discount_type === 'fixed') {
      return Math.max(0, plan.discount_price - parseFloat(couponData.fixed_amount || 0));
    }
    if (couponData.discount_type === 'percentage') {
      return Math.max(0, plan.discount_price - (plan.discount_price * parseFloat(couponData.discount || 0)) / 100);
    }
    return plan.discount_price;
  };

 const handleRazorpayPayment = async () => {
  if (!userProfile) {
    alert('❗ Please login to purchase a plan.');
    navigate('/login', {
      state: { from: `/purchase/${packageId}/${planId}` },
    });
    return;
  }

  if (!email || !phone) {
    setEmailError(!email ? '❗ Email is required.' : '');
    return;
  }

  if (email.trim().toLowerCase() !== userProfile.email.toLowerCase()) {
    setEmailError('❗ Please use the email you signed up with.');
    return;
  } else {
    setEmailError('');
  }

  const discountedAmount = calculateDiscountedPrice();

  try {
    const res = await fetch('https://admin.dtctradingclub.com/api/v1/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: userId,
        plan: plan.name,
        amount: discountedAmount,
        email,
        phone: `${countryCode}${phone}`,
        coupon: couponData?.code || 'NO_COUPON',
        currency: plan.currency || 'INR', // 🔁 send currency (INR or USD)

      }),
    });

    const responseText = await res.text();
    const data = JSON.parse(responseText);

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: 'DTC TRADING CLUB',
      description: plan.name,
      order_id: data.order_id,
      handler: async function (response) {
        try {
          const verifyRes = await fetch('https://admin.dtctradingclub.com/api/v1/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
if (!res.ok) {
  const errorText = await res.text();
  console.error('Server error:', errorText); // 👈 log full server error
  throw new Error('Failed to create order');
}
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            await fetch('https://admin.dtctradingclub.com/api/v1/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                user_id: userId,
                email,
                phone: `${countryCode}${phone}`,
                plan: plan.name,
                amount: discountedAmount,
                coupon: couponData?.code || '',
              }),
            });

            navigate('/profile', {
              state: {
                userId: userId,
                payment: {
                  plan: plan.name,
                  amount: discountedAmount,
                  email,
                  phone: `${countryCode}${phone}`,
                  coupon: couponData?.code || '',
                },
              },
            });
          } else {
            alert('❌ Invalid payment signature.');
          }
        } catch (err) {
          alert('❌ Payment verification failed.');
        }
      },
      prefill: {
        name: userProfile?.name || '',
        email,
        contact: `${countryCode}${phone}`,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert('❌ Payment failed. Please try again.');
  }
};

  const handleCosmofeedPayment = () => {
    if (plan.cosmofeed_link) {
      window.open(plan.cosmofeed_link, '_blank');
    } else {
      alert('❗ Cosmofeed link not available.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!plan) return null;

  const currencySymbol = plan.currency === 'USD' ? '$' : '₹';

  return (
    <Animated animation="fade-up" delay={40}>
      <div className="purchase-form-modal mt-5 py-5 bg-white">
        <div className="purchase-form">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <h4>Purchase {plan.name}</h4>

                <div className="mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    placeholder="Enter your email"
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="mb-3">
                  <label>Phone:</label>
                  <div className="d-flex gap-2">
                    <select
                      className="form-control"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{ width: '120px' }}
                    >
                      {countryCodes.map((country, index) => (
                        <option key={index} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <input
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Coupon Code (optional):</label>
                  <div className="d-flex">
                    <input
                      className="form-control"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        setIsCouponValid(null);
                      }}
                      placeholder="Enter coupon code"
                    />
                    <button
                      type="button"
                      className="login bg-warning rounded border-0 ms-2"
                      onClick={validateCoupon}
                      disabled={loadingCoupon}
                      style={{ height: 51 }}
                    >
                      {loadingCoupon ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                  {isCouponValid === true && (
                    <small className="text-success">
                      ✅ Coupon applied!{' '}
                      {couponData?.discount_type === 'fixed'
                        ? `${currencySymbol}${couponData.fixed_amount} off`
                        : `${couponData.discount}% off`}
                    </small>
                  )}
                  {isCouponValid === false && (
                    <small className="text-danger">
                      ❌ Invalid, expired, or not applicable for this plan
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <strong>
                    Total Payable: {currencySymbol}
                    {calculateDiscountedPrice()}
                  </strong>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="login bg-warning border-0"
                    onClick={() => {
                      if (plan.cosmofeed_link) {
                        handleCosmofeedPayment();
                      } else {
                        handleRazorpayPayment();
                      }
                    }}
                  >
                    Pay {currencySymbol}
                    {calculateDiscountedPrice()}
                  </button>
                  <button className="login bg-warning border-0" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Animated>
  );
};

export default PurchaseForm;
