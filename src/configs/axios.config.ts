import { TIMEOUT } from '@/constants/axios.constant';
import axios from 'axios';

const HTTP_ADMIN_SERVICE = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: TIMEOUT,
  },
  // .. other options
});

export default HTTP_ADMIN_SERVICE;
