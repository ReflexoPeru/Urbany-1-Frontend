import { Link } from 'react-router-dom';
import styles from './MenuItem.module.css';

const MenuItem = ({ icon: Icon, label, path, badge, isActive }) => {
  return (
    <Link 
      to={path}
      className={`${styles['menu-item']} ${isActive ? styles.active : ''}`}
    >
      <span className={styles['icon-wrapper']}>
        <Icon 
          size={18} 
          weight="regular" 
          className={styles.icon}
        />
      </span>
      <span className={styles['menu-text']}>{label}</span>
      {badge && (
        <span className={styles.badge}>{badge}</span>
      )}
    </Link>
  );
};

export default MenuItem;
