import React from 'react';
import styles from './ActiveBusinessSection.module.css';

const ActiveBusinessSection = ({ data, title = "Negocios Activos" }) => (
  <div className={styles.activeBusiness}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.businessNumbers}>
      <div className={styles.numberItem}>
        <span>Muerte</span>
        <strong>{data.muerte}</strong>
      </div>
      <div className={styles.numberItem}>
        <span>Cambio</span>
        <strong>{data.cambiacion}</strong>
      </div>
      <div className={styles.numberItem}>
        <span>Visita programada</span>
        <strong>{data.visitaProgramada}</strong>
      </div>
    </div>
  </div>
);

export default ActiveBusinessSection;