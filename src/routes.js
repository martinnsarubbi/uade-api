import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/Inicio';
import User from './pages/User';
import NotFound from './pages/Page404';
import RegistroPediatrico from './pages/RegistroPediatrico';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/medicapp',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="inicio" replace /> },
        { path: 'indicadores', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'registrosPediatricos', element: <RegistroPediatrico /> },
        { path: 'vacunas' },
        { path: 'inicio', element: <User /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
