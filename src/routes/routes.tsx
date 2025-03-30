import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { ProtectedRoute } from 'src/components/auth/protected-route';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const UsuariosPage = lazy(() => import('src/pages/usuarios'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PermissionDeniedPage = lazy(() => import('src/pages/permission-denied'));
export const CadastroPage = lazy(() => import('src/pages/cadastro'));

// Páginas de Cadastro
export const BlocosPage = lazy(() => import('src/pages/cadastros/blocos'));
export const SalasPage = lazy(() => import('src/pages/cadastros/salas'));
export const SalaDetailsPage = lazy(() => import('src/pages/cadastros/salas/sala-detail'));
export const SemestresPage = lazy(() => import('src/pages/cadastros/semestres'));

// Páginas de Reservas
export const MinhasReservasPage = lazy(() => import('src/pages/reservas/minhas-reservas'));
export const MinhasReservasRecorrentesPage = lazy(() => import('src/pages/reservas/minhas-reservas-recorrentes'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'usuarios', element: <UsuariosPage /> },
        { path: 'reservas', element: <MinhasReservasPage /> },
        { path: 'reservas/recorrentes', element: <MinhasReservasRecorrentesPage /> },
      ],
    },
    {
      element: (
        <ProtectedRoute requireSuperUser>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: 'cadastros-de-parametros', element: <CadastroPage /> },
        { path: 'cadastros/blocos', element: <BlocosPage /> },
        { path: 'cadastros/salas', element: <SalasPage /> },
        { path: 'cadastros/salas/:id', element: <SalaDetailsPage /> },
        { path: 'cadastros/semestres', element: <SemestresPage /> } 
      ],
    },
    {
      path: 'login',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'permission-denied',
      element: <PermissionDeniedPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
