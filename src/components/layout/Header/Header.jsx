import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Bell, CaretDown, ArrowLeft } from '@phosphor-icons/react';
import styles from './Header.module.css';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  // TITULOS SEGUN RUTA
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

  // OCULTAR BOTON EN DASHBOARD
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <header className={styles.header}>
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
      <div className={styles['search-container']}>
        <MagnifyingGlass size={20} className={styles['search-icon']} />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['right-section']}>
        <button className={styles['premium-btn']}>Se premium</button>
        <div className={styles['notification-container']}>
          <Bell size={22} weight="regular" className={styles['notification-icon']} />
          <span className={styles['notification-dot']}></span>
        </div>
        <div className={styles['user-profile']}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-wtBeKb7tsRR-E7q5Tzg07gJ1RPUBpwfa8ps1GmjVd0Znpk8Bvg5m0cdv4QlqfiwFJk&usqp=CAU"
            alt="Usuario"
            className={styles['user-avatar']}
          />
          <div className={styles['user-info']}>
            <span className={styles['user-name']}>Angeles L.</span>
            <span className={styles['user-role']}>Administrador</span>
          </div>
          <CaretDown size={16} className={styles['dropdown-icon']} />
        </div>
      </div>
    </header>
  );
};

export default Header;

