import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const BASE_URL = 'https://6988c468780e8375a6891d8b.mockapi.io/api';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})
