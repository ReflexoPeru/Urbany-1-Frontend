import { useToast } from '../../../contexts/ToastContext';
import Toast from './Toast';
import styles from './ToastContainer.module.css';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles['toast-container']}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          icon={toast.icon}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

