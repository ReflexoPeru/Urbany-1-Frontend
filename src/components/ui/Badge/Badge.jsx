import React from 'react';
import { IconX, IconCheck, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import styles from './Badge.module.css';

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  icon,
  closable = false,
  onClose,
  className = '',
  ...props
}) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  const getIconComponent = () => {
    if (icon) {
      const iconMap = {
        check: IconCheck,
        'alert-circle': IconAlertCircle,
        'info-circle': IconInfoCircle
      };
      return iconMap[icon];
    }
    return null;
  };

  const IconComponent = getIconComponent();

  const handleClose = (event) => {
    event.stopPropagation();
    onClose?.();
  };

  return (
    <span className={badgeClasses} {...props}>
      {IconComponent && (
        <IconComponent size={size === 'small' ? 12 : size === 'large' ? 16 : 14} className={styles.icon} />
      )}
      <span className={styles.content}>{children}</span>
      {closable && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          tabIndex={-1}
        >
          <IconX size={size === 'small' ? 10 : size === 'large' ? 14 : 12} />
        </button>
      )}
    </span>
  );
};

export default Badge;


