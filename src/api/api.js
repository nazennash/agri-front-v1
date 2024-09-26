import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/';

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


export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

export const loginUser = async (userData) => {
  return api.post('/auth/login', userData);
};

export const getUserDetails = async () => {
  return api.get('/auth/user');
};

// New API functions for products
export const getProducts = async () => {
  return api.get('/products'); // Fetch all products
};

export const createProduct = async (productData) => {
  return api.post('/products', productData); // Create a new product
};

export const getProductById = async (id) => {
  return api.get(`/products/${id}`); // Fetch a product by ID
};

export const updateProduct = async (id, productData) => {
  return api.put(`/products/${id}`, productData); // Update a product by ID
};

export const deleteProduct = async (id) => {
  return api.delete(`/products/${id}`); // Delete a product by ID
};
