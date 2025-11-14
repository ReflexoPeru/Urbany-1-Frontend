import { useEffect, useState } from 'react';
import * as PhosphorIcons from 'phosphor-react';
import styles from './Toast.module.css';

const Toast = ({ id, type = 'info', title, message, duration = 5000, icon, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    // Si hay un ícono personalizado, usarlo
    if (icon && PhosphorIcons[icon]) {
      const IconComponent = PhosphorIcons[icon];
      return <IconComponent size={20} weight="bold" />;
    }

    // Íconos por defecto según el tipo
    switch (type) {
      case 'success':
        return <PhosphorIcons.CheckCircle size={20} weight="bold" />;
      case 'error':
        return <PhosphorIcons.XCircle size={20} weight="bold" />;
      case 'warning':
        return <PhosphorIcons.Warning size={20} weight="bold" />;
      case 'info':
      default:
        return <PhosphorIcons.Info size={20} weight="bold" />;
    }
  };

  return (
    <div
      className={`${styles.toast} ${isClosing ? styles['toast-closing'] : ''
        }`}
    >
      <div className={styles['toast-icon-container']}>
        <div className={`${styles['toast-icon-wrapper']} ${styles[`icon-${type}`]}`}>
          {getIcon()}
        </div>
        {duration && (
          <svg className={styles['progress-ring']} width="48" height="48">
            <rect
              className={`${styles['progress-ring-rect']} ${styles[`progress-${type}`]}`}
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              x="2"
              y="2"
              width="44"
              height="44"
              rx="10"
              ry="10"
              style={{ animationDuration: `${duration}ms` }}
            />
          </svg>
        )}
      </div>

      <div className={styles['toast-content']}>
        <h4 className={styles['toast-title']}>{title}</h4>
        {message && <p className={styles['toast-message']}>{message}</p>}
      </div>
    </div>
  );
};

export default Toast;
