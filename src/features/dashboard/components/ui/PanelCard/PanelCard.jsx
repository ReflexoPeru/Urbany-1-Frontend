import React from 'react';
import styles from './PanelCard.module.css';

const PanelCard = ({ title, right, children }) => (
  <section className={styles.card}>
    {(title || right) && (
      <div className={styles.header}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {right && <div className={styles.right}>{right}</div>}
      </div>
    )}
    <div className={styles.body}>{children}</div>
  </section>
);

export default PanelCard;


