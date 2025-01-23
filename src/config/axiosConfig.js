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

export const instanceAPIData = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  axiosConfig,
});

export default instanceAPI;