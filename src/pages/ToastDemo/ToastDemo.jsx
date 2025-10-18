import { useToast } from '../../contexts/ToastContext';
import { allToasts } from '../../mock/toasts';
import styles from './ToastDemo.module.css';

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Toasts</h1>
        
      </div>

      <div className={styles['button-grid']}>
        {allToasts.map((toastData) => (
          <button
            key={toastData.id}
            onClick={() => toast[toastData.type](toastData.title, toastData.message, toastData.duration, toastData.icon)}
            className={`${styles.button} ${styles[`button-${toastData.type}`]}`}
          >
            {toastData.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToastDemo;
