// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dtc.sinfode.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;

// ✅ API FUNCTIONS (using `api` only)

// Packages
export const getPackages = async () => {
  try {
    const response = await api.get('/packages');
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

// Plans
export const getPlans = async (packageId) => {
  try {
    const response = await api.get(`/packages/${packageId}/plans`);
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching plans for package ${packageId}:`, error);
    return [];
  }
};

// Blogs
export const getBlogs = async () => {
  try {
    const response = await api.get('/blog');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

// Settings
// src/api.js
export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    if (response.data.status === 'success') {
      return response.data.data; // contains both about_setting and common_setting
    } else {
      throw new Error('Failed to fetch settings');
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw new Error('Error fetching settings: ' + error.message);
  }
};


// Contact Form
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact-us', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error.response?.data || { message: 'Failed to submit form' };
  }
};

// FAQs
export const getFaqs = async () => {
  try {
    const response = await api.get('/faq-data');
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

// Platform Logos
export const getPlatformLogos = async () => {
  try {
    const response = await api.get('/platfrom');
    return response.data.status === 'success' ? response.data.data : [];
  } catch (error) {
    console.error('Failed to fetch logos:', error);
    return [];
  }
};

// Slider Images
export const getSliderImages = async () => {
  try {
    const response = await api.get('/slider');
    return response.data.status === 'success'
      ? response.data.data.map((item) => item.image)
      : [];
  } catch (error) {
    console.error('Slider API error:', error);
    return [];
  }
};

// Notification Message
export const getNotificationMessage = async () => {
  try {
    const response = await api.get('/notification');
    const data = response.data.data;

    if (Array.isArray(data) && data.length > 0) {
      return data[0].name;
    } else if (typeof data === 'object' && data !== null) {
      return data.name;
    }
    return '';
  } catch (error) {
    console.error('Notification API error:', error);
    return '';
  }
};

// Offer End Time
export const getOfferEndTime = async () => {
  try {
    const res = await api.get('/offertimer');
    const offerData = res.data?.data?.[0];
    if (offerData?.end_time) {
      return new Date(offerData.end_time.replace(' ', 'T'));
    }
    return null;
  } catch (error) {
    console.error('Offer Timer API error:', error);
    return null;
  }
};

// Popup Image
export const getPopupImage = async () => {
  try {
    const res = await api.get('/popup');
    const popupData = res.data?.data?.[0];
    return popupData?.image || null;
  } catch (error) {
    console.error('Popup API error:', error);
    return null;
  }
};

// Certifications
export const getCertifications = async () => {
  try {
    const response = await api.get('/certifiaction');
    if (response.data.status === 'success') {
      return response.data.data;api
    } else {
      throw new Error('Failed to fetch certifications');
    }
  } catch (error) {
    console.error('Error fetching certifications:', error);
    throw new Error('Error fetching certifications: ' + error.message);
  }
};

// Coupons
export const getCoupons = async () => {
  try {
    const response = await api.get('/coupon');
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch coupons');
    }
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw new Error('Error fetching coupons: ' + error.message);
  }
};

// Create Order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/create-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error creating order: ' + error.message);
  }
};

// Verify Payment
export const verifyPayment = async (verificationData) => {
  try {
    const response = await api.post('/verify-payment', verificationData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error('Error verifying payment: ' + error.message);
  }
};

// Mark Payment as Success
export const markPaymentSuccess = async (paymentData) => {
  try {
    const res = await fetch('https://dtc.sinfode.com/api/v1/payment-success', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Server error:', errText);
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error('Error marking payment as success: ' + error.message);
  }
};


// Testimonials
export const getTestimonials = async () => {
  try {
    const response = await api.get('/testimonial');
    if (response.data.status === 'success' && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error('Invalid testimonials format');
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw new Error('Error fetching testimonials: ' + error.message);
  }
};

// Videos
export const getVideos = async () => {
  try {
    const response = await api.get('/video');
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch videos');
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Error fetching videos: ' + error.message);
  }
};

// Offer Timer (Alternative)
export const getOfferTimer = async () => {
  try {
    const response = await api.get('/offertimer');
    const data = response.data;

    if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
      return new Date(data.data[0].end_time);
    } else {
      throw new Error('Offer timer data is empty or invalid');
    }
  } catch (error) {
    console.error('Error fetching offer timer:', error);
    throw new Error('Error fetching offer timer: ' + error.message);
  }
};
