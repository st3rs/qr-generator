import axios, { AxiosError } from 'axios';
import { clearStoredAuth, getStoredToken } from '@/lib/authStorage';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
export const isApiEnabled = Boolean(API_BASE_URL);

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
      window.dispatchEvent(new CustomEvent('auth:logout'));
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);
