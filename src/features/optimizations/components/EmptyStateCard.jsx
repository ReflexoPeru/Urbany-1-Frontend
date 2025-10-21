import React from 'react';
import styles from './Optimizations.module.css';

export default function EmptyStateCard({ title, imageSrc, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardContent}>
        {imageSrc && (
          <img src={imageSrc} alt="empty" className={styles.cardImage} />
        )}
        <div className={styles.cardMessage}>{children}</div>
      </div>
    </div>
  );
}
