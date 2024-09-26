// src/api/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/'; // Your API URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Register User
export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

// Login User
export const loginUser = async (userData) => {
  return api.post('/auth/login', userData);
};

// Get User Details
export const getUserDetails = async () => {
  return api.get('/auth/user');
};
