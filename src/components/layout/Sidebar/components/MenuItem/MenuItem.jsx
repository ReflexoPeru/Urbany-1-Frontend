import styles from './MenuItem.module.css';

const MenuItem = ({ icon: Icon, label, path, badge, isActive, onClick }) => {
  return (
    <a 
      href={path}
      onClick={onClick}
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
    </a>
  );
};

export default MenuItem;
