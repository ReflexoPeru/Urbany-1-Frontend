import logo from '../../../../../assets/icons/logo.png';
import styles from './SidebarLogo.module.css';

const SidebarLogo = () => {
  return (
    <div className={styles['logo-container']}>
      <img src={logo} alt="CRM Urbany" className={styles.logo} />
    </div>
  );
};

export default SidebarLogo;
