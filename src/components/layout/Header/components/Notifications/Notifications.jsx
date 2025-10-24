import { useState, useEffect, useRef } from 'react';
import {
  Bell,
  House,
  File,
  Calendar,
  CheckCircle,
  CurrencyDollar,
  WarningCircle,
  UserCircle
} from 'phosphor-react';
import { notificationsMock } from '../../../../../mock/notifications';
import styles from './Notifications.module.css';

export const Notifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isNotificationsClosing, setIsNotificationsClosing] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        closeNotifications();
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const closeNotifications = () => {
    setIsNotificationsClosing(true);
    setTimeout(() => {
      setIsNotificationsOpen(false);
      setIsNotificationsClosing(false);
    }, 250);
  };

  const toggleNotifications = () => {
    if (isNotificationsOpen) {
      closeNotifications();
    } else {
      setIsNotificationsOpen(true);
    }
  };

  const handleNotificationClick = (notificationId) => {
    console.log(`Notificación ${notificationId} clickeada`);
  };

  const notifications = notificationsMock;
  const unreadCount = notifications.filter(n => !n.read).length;

  const iconMap = {
    House,
    File,
    Calendar,
    CheckCircle,
    CurrencyDollar,
    WarningCircle,
    UserCircle
  };

  return (
    <div className={styles['notification-container']} ref={notificationsRef}>
      <div
        className={styles['notification-button']}
        onClick={toggleNotifications}
      >
        <Bell
          size={22}
          weight="regular"
          className={styles['notification-icon']}
        />
        {unreadCount > 0 && (
          <span className={styles['notification-dot']}></span>
        )}
      </div>

      {isNotificationsOpen && (
        <div
          className={`${styles['notifications-dropdown']} ${isNotificationsClosing ? styles['dropdown-menu-closing'] : ''
            }`}
        >
          <div className={styles['notifications-header']}>
            <h3 className={styles['notifications-title']}>Notificaciones</h3>
            {unreadCount > 0 && (
              <span className={styles['unread-count']}>{unreadCount} nuevas</span>
            )}
          </div>

          <div className={styles['notifications-list']}>
            {notifications.map((notification) => {
              const NotificationIcon = iconMap[notification.icon];
              return (
                <button
                  key={notification.id}
                  className={`${styles['notification-item']} ${!notification.read ? styles['notification-unread'] : ''
                    }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className={`${styles['notification-icon-wrapper']} ${styles[`notification-${notification.type}`]}`}>
                    {NotificationIcon && (
                      <NotificationIcon
                        size={22}
                        weight="duotone"
                        className={styles['notification-icon-svg']}
                      />
                    )}
                  </div>
                  <div className={styles['notification-content']}>
                    <p className={styles['notification-title-text']}>{notification.title}</p>
                    <p className={styles['notification-message']}>{notification.message}</p>
                    <span className={styles['notification-time']}>{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className={styles['notification-unread-dot']} />
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles['notifications-footer']}>
            <button className={styles['see-all-notifications-btn']}>
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};