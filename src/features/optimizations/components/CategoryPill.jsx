import React from 'react';
import styles from './Optimizations.module.css';

export default function CategoryPill({ children, active = false }) {
  return (
    <div className={`${styles.categoryPill} ${active ? styles.active : ''}`}>
      {children}
    </div>
  );
}
