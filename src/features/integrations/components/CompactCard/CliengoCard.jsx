import React from 'react';
import styles from './CliengoCard.module.css';

const CliengoCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#38E47A"/>
          </svg>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>Cliengo</h3>
        <p className={styles.description}>Conecte su chatbot de Cliengo con 2clics.</p>
      </div>
      <div className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default CliengoCard;
