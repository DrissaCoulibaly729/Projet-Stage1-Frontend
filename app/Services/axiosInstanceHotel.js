import axios from 'axios';

const axiosInstanceHotel = axios.create({
    baseURL: 'https://projet-stage1-backend.onrender.com/api/hotels',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
  });
  

  export default axiosInstanceHotel;