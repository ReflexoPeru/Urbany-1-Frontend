import React from 'react';
import styles from './NetworksHeader.module.css';

const NetworksHeader = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Redes</h1>
      <button className={styles.buttonRed}>
        Crear nueva Red
      </button>
    </div>
  );
};

export default NetworksHeader;