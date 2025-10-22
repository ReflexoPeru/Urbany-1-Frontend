import React, { useState } from 'react';
import styles from './Notifications.module.css';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Nueva Oportunidad de Negocio',
      message: 'Se ha creado una nueva oportunidad en el sector residencial',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      title: 'Actualización de Propiedad',
      message: 'La propiedad en 123 Main St ha sido actualizada',
      timestamp: '2024-01-15T09:15:00Z',
      read: true
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <h1 className={styles.title}>Notificaciones</h1>
        <p className={styles.subtitle}>
          Gestiona tus preferencias de notificación y revisa tus alertas.
        </p>

        <div className={styles.profileContainer}>
          <div className={styles.formSection}>
            <div className={styles.notificationsList}>
              {notifications.map(notification => (
                <div key={notification.id} className={styles.notificationItem}>
                  <h4 className={styles.notificationTitle}>{notification.title}</h4>
                  <p className={styles.notificationMessage}>{notification.message}</p>
                  <span className={styles.timestamp}>
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

