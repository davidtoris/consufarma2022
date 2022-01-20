import axios from 'axios';
import { API_BASE_URL } from '../constants';

const axiosConfig = {
  withCredentials: true,
};

const instanceAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-type': 'application/json' },
  axiosConfig,
});

export default instanceAPI;