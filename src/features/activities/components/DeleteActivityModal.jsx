import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import styles from './DeleteActivityModal.module.css';

const DeleteActivityModal = ({ isOpen, onClose, onConfirm, activity }) => {
  if (!isOpen || !activity) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <AlertTriangle size={24} className={styles.icon} />
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>¿Eliminar actividad?</h2>
          <p className={styles.message}>
            Esta acción no se puede deshacer. Se eliminará permanentemente la actividad:
          </p>
          <div className={styles.activityInfo}>
            <div className={styles.activityType}>{activity.type}</div>
            <div className={styles.activityTitle}>{activity.title}</div>
            <div className={styles.activityDate}>
              {new Date(activity.date).toLocaleDateString('es-ES')} a las {activity.time}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteActivityModal;
