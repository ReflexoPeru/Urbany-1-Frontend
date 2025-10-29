import { useEffect } from 'react';
import * as PhosphorIcons from 'phosphor-react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  icon,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  showCancel = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    if (icon && PhosphorIcons[icon]) {
      const IconComponent = PhosphorIcons[icon];
      return <IconComponent size={28} weight="bold" />;
    }

    switch (type) {
      case 'success':
        return <PhosphorIcons.CheckCircle size={28} weight="bold" />;
      case 'error':
      case 'danger':
        return <PhosphorIcons.Warning size={28} weight="bold" />;
      case 'warning':
        return <PhosphorIcons.WarningCircle size={28} weight="bold" />;
      case 'info':
      default:
        return <PhosphorIcons.Info size={28} weight="bold" />;
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[`modal-${type}`]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles['icon-wrapper']} ${styles[`icon-${type}`]}`}>
          {getIcon()}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.actions}>
          {showCancel && (
            <button
              onClick={onClose}
              className={`${styles.button} ${styles['button-cancel']}`}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`${styles.button} ${styles[`button-${type}`]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

