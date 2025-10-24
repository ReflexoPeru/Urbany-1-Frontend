import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/dashboard/pages/dashboard';
import Optimizations from '../features/optimizations/pages/OptimizationsPage';
import Properties from '../features/properties/pages/PropertiesPage';
import Map from '../features/map/pages/MapPage';
import ToastDemo from '../pages/ToastDemo';
import Contacts from '../features/contacts/pages/ContactsPage';
import Profile from '../features/profile/components/Profile';
import Branches from '../features/branches/pages/BranchManagement';
import Integrations from '../features/integrations/pages/integrations';
import Portals from '../features/integrations/pages/portales/Portals';
import Calendar from '../features/integrations/pages/herramientas/calendar';
import SocialMedia from '../features/integrations/pages/comunicacion/socialMedia';
import Hoomi from '../features/integrations/pages/herramientas/hoomi';
import Email from '../features/integrations/pages/comunicacion/Email';
import Networks from '../features/integrations/pages/redes/Networks';
import Marketing from '../features/integrations/pages/marketing/Marketing';
import EmailMarketing from '../features/integrations/pages/comunicacion/emailMarketing';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <div><h2>juas juas</h2></div>,
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
        element: <div><h2>Negocios</h2></div>,
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
        element: <div><h2>Tasaciones</h2></div>,
      },
      {
        path: 'redes',
        element: <div><h2>Redes</h2></div>,
      },
      {
        path: 'actividades',
        element: <div><h2>Actividades</h2></div>,
      },
      {
        path: 'reportes',
        element: <div><h2>Reportes</h2></div>,
      },
      {
        path: 'mapa',
        element: <Map />,
      },
      {
        path: 'mensajes',
        element: <div><h2>Mensajes</h2></div>,
      },
      {
        path: 'emprendimientos',
        element: <div><h2>Emprendimientos</h2></div>,
      },
      {
        path: 'comentarios',
        element: <div><h2>Enviar Comentarios</h2></div>,
      },
      {
        path: 'configuracion',
        element: <div><h2>Configuración</h2></div>,
      },

      ///////////////////////
      // UserProfile routes
      //////////////////////

      {
        path: 'perfil',
        element: <Profile />,
      },
      {
        path: 'company',
        element: <div><h2>Perfil de la Inmobiliaria</h2></div>,
      },
      {
        path: 'integrations',
        element: <Integrations />,
        children: [
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
        element: <div><h2>Gestión de Usuarios</h2></div>,
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
        element: <div><h2>Sitio Web</h2></div>,
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
        element: <div><h2>Ayuda</h2></div>,
      },
      {
        path: 'toast-demo',
        element: <ToastDemo />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

