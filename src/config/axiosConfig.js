import axios from 'axios';


const axiosConfig = {
  withCredentials: true,
};

const instanceAPI = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
  headers: { 'Content-type': 'application/json' },
  axiosConfig,
});

export const instanceAPIData = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  axiosConfig,
});

export default instanceAPI;