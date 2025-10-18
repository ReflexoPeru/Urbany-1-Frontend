import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import ToastContainer from '../components/ui/Toast/ToastContainer';
import ConfirmModalContainer from '../components/ui/Modal/ConfirmModal/ConfirmModalContainer';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <div className={styles.main}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      <ToastContainer />
      <ConfirmModalContainer />
    </div>
  );
};

export default MainLayout;

