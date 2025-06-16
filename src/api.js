// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dtc.sinfode.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getPackages = async () => {
  try {
    const response = await api.get('/packages'); // Use `api` instance
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

// api.js
export const getPlans = async (packageId) => {
  try {
    const response = await api.get(`/packages/${packageId}/plans`);
    return response.data.data || []; // ✅ only return the array part
  } catch (error) {
    console.error(`Error fetching plans for package ${packageId}:`, error);
    return []; // ✅ fail-safe
  }
};

// src/api.js
export const getBlogs = async () => {
  try {
    const response = await api.get('/blog');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

// src/api.js
export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    if (response.data.status === 'success') {
      return response.data.data.common_setting;
    }
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact-us', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error.response?.data || { message: 'Failed to submit form' };
  }

  
};

// src/api.js (add this below existing functions)
export const getFaqs = async () => {
  try {
    const response = await api.get('/faq-data');
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

// src/api.js (append this function)
export const getPlatformLogos = async () => {
  try {
    const response = await api.get('/platfrom'); // yes, the API spelling is "platfrom"
    if (response.data.status === 'success') {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch logos:', error);
    return [];
  }
};

// src/api.js (add below existing functions)
export const getSliderImages = async () => {
  try {
    const response = await api.get('/slider');
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.map(item => item.image);
    }
    return [];
  } catch (error) {
    console.error('Slider API error:', error);
    return [];
  }
};

// src/api.js
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

// src/api.js

export const getOfferEndTime = async () => {
  try {
    const res = await api.get('/offertimer');
    const offerData = res.data?.data?.[0];
    if (offerData?.end_time) {
      // Format and return Date object
      return new Date(offerData.end_time.replace(' ', 'T'));
    }
    return null;
  } catch (error) {
    console.error('Offer Timer API error:', error);
    return null;
  }
};

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











export default api; // Named export