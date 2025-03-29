import { publicApi } from '../../axios';

import type { LoginRequest, LoginResponse } from './types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await publicApi.post<LoginResponse>('/v1/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
  },

  isAuthenticated: () => !!localStorage.getItem('accessToken')
}; 