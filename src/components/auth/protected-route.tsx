import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'src/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperUser?: boolean;
}

export function ProtectedRoute({ children, requireSuperUser = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    console.error('Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('user', user);

  if (requireSuperUser && !user?.super_user) {
    console.error('Usuário não tem permissão de administrador');
    return <Navigate to="/permission-denied" replace />;
  }

  return <>{children}</>;
} 