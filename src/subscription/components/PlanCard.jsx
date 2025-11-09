import React from 'react';
import styles from '../pages/SubscriptionPage.module.css';
import Price from './Price.jsx';
import usePricing from '../hooks/usePricing.js';

export default function PlanCard({ plan, periodo, isSelected, onSelect }) {
  const { calcularPrecio } = usePricing();
  const precio = calcularPrecio(periodo, plan.precioMensual);

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.planNameRow}>
          <input
            type="radio"
            name="plan"
            value={plan.id}
            checked={isSelected}
            onChange={onSelect}
            className={styles.planRadio}
          />
          <h3 className={styles.planName}>{plan.nombre}</h3>
        </div>
        <Price value={precio} periodo={periodo} />
      </div>
      <ul className={styles.features}>
        {plan.caracteristicas.map((txt, idx) => (
          <li key={idx} className={styles.feature}>
            <span className={styles.checkmark}>✓</span>
            <span>{txt}</span>
          </li>
        ))}
      </ul>
      <button
        className={`${styles.actionBtn} ${isSelected ? styles.actionBtnSelected : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {isSelected ? 'Plan seleccionado' : 'Elegir este plan'}
      </button>
    </div>
  );
}