import React, { useState } from 'react';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Notifications from './Notifications';
import ActiveSessions from './ActiveSessions';
import styles from './ProfileMain.module.css';

const ProfileMain = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Mi Perfil' },
    { id: 'password', label: 'Cambiar contraseña' },
    { id: 'notifications', label: 'Notificaciones' },
    { id: 'sessions', label: 'Sesiones activas' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'password':
        return <ChangePassword />;
      case 'notifications':
        return <Notifications />;
      case 'sessions':
        return <ActiveSessions />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.navTab} ${activeTab === tab.id ? styles.navTabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.content}>
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default ProfileMain;

