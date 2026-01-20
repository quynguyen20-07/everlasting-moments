// API Client - Axios instance with interceptors
import axios from 'axios';
import { getStoredToken } from '@/hooks/useAuth';

const API_BASE_URL = '/api'; // Will be replaced with actual backend URL

// Logout callback - will be set by the app
let logoutCallback: (() => void) | null = null;

export function setApiLogoutCallback(callback: () => void) {
  logoutCallback = callback;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (logoutCallback) {
        logoutCallback();
      }
    }
    return Promise.reject(error);
  }
);
