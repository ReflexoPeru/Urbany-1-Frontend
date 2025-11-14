import React from 'react';
import { IconPlayerPlay } from '@tabler/icons-react';
import styles from './WhatsAppBrandButton.module.css';

const WhatsAppBrandButton = ({
  text = 'CRM Urbany | WhatsApp',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className={styles.playIcon}>
        <IconPlayerPlay size={16} />
      </div>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default WhatsAppBrandButton;

