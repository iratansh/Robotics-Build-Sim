import axios from 'axios';

const API_URL = 'http://localhost:5173/api/auth/';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const register = async (firstName, lastName, email, password) => {
  const response = await axios.post(API_URL + 'register', {
    firstName,
    lastName,
    email,
    password
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', {
    email,
    password
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};