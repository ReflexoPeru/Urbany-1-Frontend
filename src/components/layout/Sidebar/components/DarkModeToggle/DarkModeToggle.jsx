import { Moon } from 'phosphor-react';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = ({ darkMode, onToggle }) => {
  return (
    <div className={styles['dark-mode-toggle']}>
      <span className={styles['icon-wrapper']}>
        <Moon size={18} weight="regular" className={styles.icon} />
      </span>
      <span className={styles['menu-text']}>Dark Mode</span>
      <label className={styles.switch}>
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={onToggle}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
