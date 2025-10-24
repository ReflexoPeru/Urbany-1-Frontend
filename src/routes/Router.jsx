import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/dashboard/pages/dashboard';
import Integrations from '../features/integrations/pages/integrations';
import Portals from '../features/integrations/pages/Portals';
import Calendar from '../features/integrations/pages/calendar';
import SocialMedia from '../features/integrations/pages/socialMedia';
import Hoomi from '../features/integrations/pages/hoomi';
import Email from '../features/integrations/pages/email';
import Networks from '../features/integrations/pages/networks';
import Marketing from '../features/integrations/pages/Marketing';
import EmailMarketing from '../features/integrations/pages/emailMarketing';
import ToastDemo from '../pages/ToastDemo';



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
        element: <Dashboard/>,
      },
      {
        path: 'propiedades',
        element: <div><h2>Propiedades</h2></div>,
      },
      {
        path: 'negocios',
        element: <div><h2>Negocios</h2></div>,
      },
      {
        path: 'contactos',
        element: <div><h2>Contactos</h2></div>,
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
        element: <div><h2>Mapa</h2></div>,
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
        element: <div><h2>Mi Perfil</h2></div>,
      },
      {
        path: 'company',
        element: <div><h2>Perfil de la Inmobiliaria</h2></div>,
      },
      {
        path: 'integrations',
        element: <Integrations />,
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
      {
        path: 'usuarios',
        element: <div><h2>Gestión de Usuarios</h2></div>,
      },
      {
        path: 'branches',
        element: <div><h2>Gestión de Sucursales</h2></div>,
      },
      {
        path: 'automation',
        element: <div><h2>Automatización</h2></div>,
      },
      {
        path: 'optimizations',
        element: <div><h2>Optimizaciones</h2></div>,
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

