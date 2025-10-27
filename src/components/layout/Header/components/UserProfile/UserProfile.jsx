import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CaretDown,
  User,
  Buildings,
  PuzzlePiece,
  Users,
  MapPin,
  Robot,
  Lightning,
  Globe,
  Article,
  CrownSimple,
  Gift,
  Question,
  SignOut
} from 'phosphor-react';
import styles from './UserProfile.module.css';

export const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setIsDropdownClosing(true);
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsDropdownClosing(false);
    }, 250);
  };

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleMenuItemClick = (action) => {
    closeDropdown();
    setTimeout(() => {
      if (action === 'logout') {
        navigate('/login');
      } else if (action === 'profile') {
        navigate('/configuracion/perfil');
      } else if (action === 'company') {
        navigate('/company');
      } else if (action === 'integrations') {
        navigate('/integrations/portals');
      } else if (action === 'users') {
        navigate('/usuarios');
      } else if (action === 'branches') {
        navigate('/branches');
      } else if (action === 'automation') {
        navigate('/automation');
      } else if (action === 'optimizations') {
        navigate('/optimizations');
      } else if (action === 'website') {
        navigate('/website');
      } else if (action === 'blog') {
        navigate('/blog');
      } else if (action === 'subscription') {
        navigate('/subscription');
      } else if (action === 'invite') {
        navigate('/invite');
      } else if (action === 'help') {
        navigate('/help');
      }
    }, 250);
  };

  const menuItems = [
    { id: 'profile', label: 'Mi Perfil', icon: User, action: 'profile' },
    { id: 'company', label: 'Perfil de la Inmobiliaria', icon: Buildings, action: 'company' },
    { id: 'divider1', type: 'divider' },
    { id: 'integrations', label: 'Integraciones', icon: PuzzlePiece, action: 'integrations' },
    { id: 'users', label: 'Gestión de Usuarios', icon: Users, action: 'users' },
    { id: 'branches', label: 'Gestión de Sucursales', icon: MapPin, action: 'branches' },
    { id: 'divider2', type: 'divider' },
    { id: 'automation', label: 'Automatización', icon: Robot, action: 'automation' },
    { id: 'optimizations', label: 'Optimizaciones', icon: Lightning, action: 'optimizations' },
    { id: 'divider3', type: 'divider' },
    { id: 'website', label: 'Sitio Web', icon: Globe, action: 'website' },
    { id: 'blog', label: 'Blog', icon: Article, action: 'blog' },
    { id: 'divider4', type: 'divider' },
    { id: 'subscription', label: 'Actualizar mi suscripción', icon: CrownSimple, action: 'subscription', highlight: true },
    { id: 'invite', label: 'Invita y gana', icon: Gift, action: 'invite' },
    { id: 'divider5', type: 'divider' },
    { id: 'help', label: 'Ayuda', icon: Question, action: 'help' },
    { id: 'logout', label: 'Cerrar sesión', icon: SignOut, action: 'logout', danger: true }
  ];

  return (
    <div className={styles['user-profile-container']} ref={dropdownRef}>
      <div
        className={`${styles['user-profile']} ${isDropdownOpen ? styles['user-profile-active'] : ''}`}
        onClick={toggleDropdown}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-wtBeKb7tsRR-E7q5Tzg07gJ1RPUBpwfa8ps1GmjVd0Znpk8Bvg5m0cdv4QlqfiwFJk&usqp=CAU"
          alt="Usuario"
          className={styles['user-avatar']}
        />
        <div className={styles['user-info']}>
          <span className={styles['user-name']}>Sanito L.</span>
          <span className={styles['user-role']}>Administrador</span>
        </div>
        <CaretDown
          size={16}
          className={`${styles['dropdown-icon']} ${isDropdownOpen ? styles['dropdown-icon-rotated'] : ''}`}
        />
      </div>

      {isDropdownOpen && (
        <div
          className={`${styles['dropdown-menu']} ${isDropdownClosing ? styles['dropdown-menu-closing'] : ''
            }`}
        >
          {menuItems.map((item) => {
            if (item.type === 'divider') {
              return <div key={item.id} className={styles['menu-divider']} />;
            }

            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`${styles['menu-item']} ${item.highlight ? styles['menu-item-highlight'] : ''
                  } ${item.danger ? styles['menu-item-danger'] : ''}`}
                onClick={() => handleMenuItemClick(item.action)}
              >
                <Icon size={20} weight="regular" className={styles['menu-item-icon']} />
                <span className={styles['menu-item-label']}>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};