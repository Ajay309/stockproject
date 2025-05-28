// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
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

export const getPlans = async (packageId) => {
  try {
    const response = await api.get(`/packages/${packageId}/plans`); // Use `api` instance
    return response.data;
  } catch (error) {
    console.error(`Error fetching plans for package ${packageId}:`, error);
    throw error;
  }
};

export default api; // Named export