import React, { useMemo } from 'react';
import styles from '../pages/SubscriptionPage.module.css';

export default function Price({ value, periodo }) {
  const etiqueta = periodo === 'anual' ? 'POR AÑO' : 'POR MES';
  const formado = useMemo(
    () =>
      value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [value]
  );

  return (
    <div className={styles.precioWrap}>
      <span className={styles.precio}>U$D{formado}</span>
      <span className={styles.periodoUpper}> {etiqueta}</span>
    </div>
  );
}