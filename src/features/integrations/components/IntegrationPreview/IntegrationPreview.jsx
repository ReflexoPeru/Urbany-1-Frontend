import React from 'react';
import { IconApps } from '@tabler/icons-react';
import styles from './IntegrationPreview.module.css';

const IntegrationPreview = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.iconWrapper}>
          <IconApps size={36} stroke={1.6} />
        </div>
        <h3 className={styles.title}>Seleccione una categoría</h3>
        <p className={styles.description}>
          Elija una categoría del menú lateral para ver las integraciones disponibles y activar las que necesite.
        </p>
      </div>
    </div>
  );
};

export default IntegrationPreview;
