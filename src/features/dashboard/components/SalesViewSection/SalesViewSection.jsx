import React from 'react';
import styles from './SalesViewSection.module.css';

const SalesViewSection = ({ views }) => (
  <div className={styles.salesViewSection}>
    <h3 className={styles.title}>Viendo cant. de ventas</h3>
    <ul className={styles.viewsList}>
      {views.map((view, index) => (
        <li key={index} className={styles.viewItem}>
          {view}
        </li>
      ))}
    </ul>
  </div>
);

export default SalesViewSection;