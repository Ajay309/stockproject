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


export default api; // Named export