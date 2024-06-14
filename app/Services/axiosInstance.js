import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://projet-stage1-backend.onrender.com/api/users',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});



export default axiosInstance;
