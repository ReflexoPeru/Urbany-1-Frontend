import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/dashboard/pages/SalesDashboardPage';
import Optimizations from '../features/optimizations/pages/OptimizationsPage';
import Properties from '../features/properties/pages/PropertiesPage';
import Map from '../features/map/pages/MapPage';
import ToastDemo from '../pages/ToastDemo';
import ComponentShowcase from '../pages/ComponentShowcase';
import Contacts from '../features/contacts/pages/ContactsPage';
import ConfiguracionLayout from '../features/profile/components/ConfiguracionLayout';
import Profile from '../features/profile/components/Profile';
import Password from '../features/profile/components/Password';
import Notifications from '../features/profile/components/Notifications';
import Sessions from '../features/profile/components/Sessions';
import RealEstateInfoPage from '../features/real_estate_info/pages/RealEstateInfoPage';
import Branches from '../features/branches/pages/BranchManagement';
import Integrations from '../features/integrations/pages/integrations';
import Portals from '../features/integrations/pages/portales/Portals';
import Calendar from '../features/integrations/pages/herramientas/calendar';
import SocialMedia from '../features/integrations/pages/comunicacion/socialMedia';
import Hoomi from '../features/integrations/pages/herramientas/hoomi';
import Email from '../features/integrations/pages/comunicacion/Email';
import Networks from '../features/networks/pages/NetworksPage';
import Marketing from '../features/integrations/pages/marketing/Marketing';
import EmailMarketing from '../features/integrations/pages/comunicacion/emailMarketing';
import Activities from '../features/activities/pages/Activities';
import Business from '../features/business/pages/business';
import Appraisals from '../features/appraisals/pages/appraisals';
import Login from '../features/auth/pages/login';
import Register from '../features/auth/pages/register';
import RegisterInmobiliaria from '../features/auth/pages/register_inmobiliaria';
import ReportsPage from '../features/reports/pages/ReportsPage';
import MessagePage from '../features/message/pages/MessagePage';
import CommentsPage from '../features/comment/pages/CommentsPage';
import UsersPage from '../features/users/pages/UsersPage';
import { Navigate } from 'react-router-dom';
import WebsitePage from '../features/website/pages/WebsitePage';
import VenturesPage from '../features/emprendimientos/pages/VenturesPage';
import VentureDetailPage from '../features/emprendimientos/pages/VentureDetailPage';
import HelpPage from '../features/help/pages/HelpPage';



const router = createBrowserRouter([
  // Rutas de autenticación independientes (sin sidebar ni header)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/register-inmobiliaria',
    element: <RegisterInmobiliaria />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'propiedades',
        element: <Properties />,
      },
      {
        path: 'negocios',
        element: <Business />,
      },
      {
        path: 'contactos',
        element: <Contacts />,
      },
      {
        path: 'valoraciones',
        element: <div><h2>Valoraciones</h2></div>,
      },
      {
        path: 'tasaciones',
        element: <Appraisals />,
      },
      {
        path: 'redes',
        element: <Networks />,
      },
      {
        path: 'activities',
        element: <Activities />,
      },
      {
        path: 'reportes',
        element: <ReportsPage />,
      },
      {
        path: 'mapa',
        element: <Map />,
      },
      {
        path: 'mensajes',
        element: <MessagePage />,
      },
      {
        path: 'emprendimientos',
        children: [
          {
            index: true,
            element: <VenturesPage />,
          },
          {
            path: 'nuevo',
            element: <VentureDetailPage />,
          },
          {
            path: ':id',
            element: <VentureDetailPage />,
          },
        ],
      },
      {
        path: 'comentarios',
        element: <CommentsPage />,
      },
      {
        path: 'configuracion',
        element: <ConfiguracionLayout />,
        children: [
          {
            path: 'perfil',
            element: <Profile />,
          },
          {
            path: 'password',
            element: <Password />,
          },
          {
            path: 'notificaciones',
            element: <Notifications />,
          },
          {
            path: 'sesiones',
            element: <Sessions />,
          },
        ]
      },
      {
        path: 'company',
        element: <RealEstateInfoPage />,
      },
      {
        path: 'integrations',
        element: <Integrations />,
        children: [
          {
            index: true,
            element: <Portals />,
          },
          {
            path: 'portals',
            element: <Portals />,
          },
          {
            path: 'calendar',
            element: <Calendar />,
          },
          {
            path: 'social-media',
            element: <SocialMedia />,
          },
          {
            path: 'hoomi',
            element: <Hoomi />,
          },
          {
            path: 'email',
            element: <Email />,
          },
          {
            path: 'networks',
            element: <Networks />,
          },
          {
            path: 'marketing',
            element: <Marketing />,
          },
          {
            path: 'emailMarketing',
            element: <EmailMarketing />,
          },
        ]
      },
      {
        path: 'usuarios',
        element: <UsersPage />,
      },
      {
        path: 'branches',
        element: <Branches />,
      },
      {
        path: 'automation',
        element: <div><h2>Automatización</h2></div>,
      },
      {
        path: 'optimizations',
        element: <Optimizations />,
      },
      {
        path: 'website',
        element: <WebsitePage />,
      },
      {
        path: 'blog',
        element: <div><h2>Blog</h2></div>,
      },
      {
        path: 'subscription',
        element: <div><h2>Actualizar mi suscripción</h2></div>,
      },
      {
        path: 'invite',
        element: <div><h2>Invita y gana</h2></div>,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
      {
        path: 'toast-demo',
        element: <ToastDemo />,
      },
      {
        path: 'component-showcase',
        element: <ComponentShowcase />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

