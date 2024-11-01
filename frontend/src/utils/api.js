import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

// Optional: Exclude login and register routes from adding the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (
    token &&
    !config.url.includes('/api/auth/login') &&
    !config.url.includes('/api/auth/register')
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;