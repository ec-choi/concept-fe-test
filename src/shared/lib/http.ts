import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://frontend-assignment-api.vercel.app/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use((response) => {
  return response;
});
