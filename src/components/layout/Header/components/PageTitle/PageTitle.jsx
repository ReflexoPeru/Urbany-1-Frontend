import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
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
    '/actividades': 'Actividades',
    '/reportes': 'Reportes',
    '/configuracion': 'Configuración',
    '/mapa': 'Mapa',
    '/mensajes': 'Mensajes',
    '/emprendimientos': 'Emprendimientos',
    '/comentarios': 'Enviar Comentarios'
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