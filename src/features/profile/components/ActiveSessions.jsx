import React, { useState } from 'react';
import styles from './ActiveSessions.module.css';

const ActiveSessions = () => {
  const [sessions] = useState([
    {
      id: 1,
      device: 'Chrome en Windows',
      location: 'New York, NY, USA',
      lastActive: '2024-01-15T10:30:00Z',
      isCurrent: true
    },
    {
      id: 2,
      device: 'Safari en iPhone',
      location: 'New York, NY, USA',
      lastActive: '2024-01-15T09:15:00Z',
      isCurrent: false
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <h1 className={styles.title}>Sesiones activas</h1>
        <p className={styles.subtitle}>
          Gestiona y monitorea las sesiones activas en tu cuenta.
        </p>

        <div className={styles.profileContainer}>
          <div className={styles.formSection}>
            <div className={styles.sessionsList}>
              {sessions.map(session => (
                <div key={session.id} className={styles.sessionItem}>
                  <h4 className={styles.sessionTitle}>{session.device}</h4>
                  <p className={styles.sessionLocation}>{session.location}</p>
                  <span className={styles.timestamp}>
                    {new Date(session.lastActive).toLocaleDateString()}
                  </span>
                  {session.isCurrent && (
                    <span className={styles.currentBadge}>Sesión actual</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessions;

