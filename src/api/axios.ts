import type { InternalAxiosRequestConfig } from "axios";

import axios from "axios";

// 👉 Variável de ambiente com fallback local
const BASE_URL = 'https://reserva-salas.poc.joaosantos.dev.br/api';

// 👉 Criação da instância
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👉 Interceptor para incluir o token nas requisições privadas
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 API pública (sem token)
export const publicApi = {
  get: <T>(url: string, params?: any) => axiosInstance.get<T>(url, { params }),
  post: <T>(url: string, data?: any) => axiosInstance.post<T>(url, data),
  put: <T>(url: string, data?: any) => axiosInstance.put<T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url),
};

// 👉 API privada (com token do localStorage)
export const privateApi = {
  get: <T>(url: string, params?: any) => axiosInstance.get<T>(url, { params }),
  post: <T>(url: string, data?: any) => axiosInstance.post<T>(url, data),
  put: <T>(url: string, data?: any) => axiosInstance.put<T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url),
};

export default axiosInstance;