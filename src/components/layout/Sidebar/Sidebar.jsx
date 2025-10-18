import { useState } from 'react';
import { 
  SquaresFour,
  CheckSquare,
  ChatCircleDots,
  Buildings,
  CurrencyDollar,
  EnvelopeSimple,
  PaperPlaneTilt,
  Globe,
  Handshake,
  User,
  ChartBar,
  ChatTeardropText,
  Gear
} from 'phosphor-react';
import SidebarLogo from './components/SidebarLogo/SidebarLogo';
import MenuLabel from './components/MenuLabel/MenuLabel';
import MenuItem from './components/MenuItem/MenuItem';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('negocios');

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: SquaresFour, 
      path: '/dashboard' 
    },
    { 
      id: 'actividades', 
      label: 'Actividades', 
      icon: CheckSquare, 
      path: '/actividades' 
    },
    { 
      id: 'tasaciones', 
      label: 'Tasaciones', 
      icon: ChatCircleDots, 
      path: '/tasaciones' 
    },
    { 
      id: 'propiedades', 
      label: 'Propiedades', 
      icon: Buildings, 
      path: '/propiedades' 
    },
    { 
      id: 'negocios', 
      label: 'Negocios', 
      icon: CurrencyDollar, 
      path: '/negocios'
    },
    { 
      id: 'mensajes', 
      label: 'Mensajes', 
      icon: EnvelopeSimple, 
      path: '/mensajes'
    },
    { 
      id: 'redes', 
      label: 'Redes', 
      icon: PaperPlaneTilt, 
      path: '/redes' 
    },
    { 
      id: 'mapa', 
      label: 'Mapa', 
      icon: Globe, 
      path: '/mapa' 
    },
    { 
      id: 'emprendimientos', 
      label: 'Emprendimientos', 
      icon: Handshake, 
      path: '/emprendimientos' 
    },
    { 
      id: 'contactos', 
      label: 'Contactos', 
      icon: User, 
      path: '/contactos' 
    },
    { 
      id: 'reportes', 
      label: 'Reportes', 
      icon: ChartBar, 
      path: '/reportes' 
    },
    { 
      id: 'comentarios', 
      label: 'Enviar Comentarios', 
      icon: ChatTeardropText, 
      path: '/comentarios' 
    }
  ];

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMenuItemClick = (e, itemId) => {
    e.preventDefault();
    setActiveItem(itemId);
  };

  return (
    <aside className={styles.sidebar}>
      <SidebarLogo />

      <nav className={styles.nav}>
        <MenuLabel>MENU</MenuLabel>
        <ul className={styles['menu-list']}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <MenuItem
                icon={item.icon}
                label={item.label}
                path={item.path}
                badge={item.badge}
                isActive={activeItem === item.id}
                onClick={(e) => handleMenuItemClick(e, item.id)}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <MenuItem
          icon={Gear}
          label="Configuración"
          path="/configuracion"
          isActive={false}
          onClick={(e) => e.preventDefault()}
        />
        
        <DarkModeToggle 
          darkMode={darkMode}
          onToggle={handleToggleDarkMode}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
