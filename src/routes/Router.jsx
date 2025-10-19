import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/dashboard/pages/dashboard';
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

