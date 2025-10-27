import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import styles from './PageTitle.module.css';

export const PageTitle = () => {
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  const routeTitles = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/propiedades': 'Propiedades',
    '/negocios': 'Negocios',
    '/contactos': 'Contactos',
    '/valoraciones': 'Valoraciones',
    '/tasaciones': 'Tasaciones',
    '/redes': 'Redes',
    '/activities': 'Actividades',
    '/reportes': 'Reportes',
    '/mapa': 'Mapa',
    '/mensajes': 'Mensajes',
    '/emprendimientos': 'Emprendimientos',
    '/comentarios': 'Enviar Comentarios',
    // Configuracion nested routes
    '/configuracion/perfil': 'Mi Perfil',
    '/configuracion/password': 'Cambiar contraseña',
    '/configuracion/notificaciones': 'Notificaciones',
    '/configuracion/sesiones': 'Sesiones activas',
    // Integrations nested routes
    '/integrations': 'Portales',
    '/integrations/portals': 'Portales',
    '/integrations/calendar': 'Calendario',
    '/integrations/social-media': 'Redes Sociales',
    '/integrations/hoomi': 'Hoomi',
    '/integrations/email': 'Email',
    '/integrations/networks': 'Redes',
    '/integrations/marketing': 'Marketing',
    '/integrations/emailMarketing': 'Email Marketing',
    // Independent routes
    '/company': 'Información inmobiliaria',
    '/usuarios': 'Gestión de Usuarios',
    '/branches': 'Gestión de Sucursales',
    '/automation': 'Automatización',
    '/optimizations': 'Optimizaciones',
    '/website': 'Sitio Web',
    '/blog': 'Blog',
    '/subscription': 'Actualizar mi suscripción',
    '/invite': 'Invita y gana',
    '/help': 'Ayuda'
  };

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'Dashboard';
    setPageTitle(title);
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <div className={styles['title-section']}>
      {!isDashboard && (
        <button
          onClick={handleGoBack}
          className={styles['back-button']}
          aria-label="Volver"
        >
          <ArrowLeft size={22} weight="bold" />
        </button>
      )}
      <h1 className={styles.title}>{pageTitle}</h1>
    </div>
  );
};