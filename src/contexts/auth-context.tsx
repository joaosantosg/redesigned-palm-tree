import type { IUsuario } from 'src/api/services/usuario/usuario.types';

import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { authService } from 'src/api/services/auth/auth.service';

interface AuthContextType {
  user: IUsuario | null;
  isAuthenticated: boolean;
  login: (matricula: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUsuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('isSuperUser');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('usuario');

      if (!token || !storedUser) {
        logout();
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error checking auth:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuth]);

  const login = useCallback(async (matricula: string, senha: string) => {
    try {
      const response = await authService.login({ matricula, senha });
      setUser(response.usuario);
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      localStorage.setItem('expiresIn', response.expires_in);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      localStorage.setItem('isSuperUser', response.usuario.super_user.toString());
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [navigate]);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated, login, logout]
  );

  if (isLoading) {
    return null; // ou um componente de loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 