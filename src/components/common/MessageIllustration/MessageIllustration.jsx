import React from 'react';
import messageSvg from '../../../assets/message/message.svg';
import styles from './MessageIllustration.module.css';

const MessageIllustration = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img
        src={messageSvg}
        alt="Ilustración de mensajes"
        className={styles.image}
      />
    </div>
  );
};

export default MessageIllustration;

