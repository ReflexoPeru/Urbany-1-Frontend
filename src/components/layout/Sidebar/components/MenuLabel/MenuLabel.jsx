import styles from './MenuLabel.module.css';

const MenuLabel = ({ children }) => {
  return (
    <div className={styles['menu-label']}>
      {children}
    </div>
  );
};

export default MenuLabel;
