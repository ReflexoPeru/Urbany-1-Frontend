import React from 'react';
import { Target, Plus } from 'lucide-react';
import styles from './EmptyState.module.css';

const EmptyState = ({ onAddActivity }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.illustration}>
        <div className={styles.targetContainer}>
          <Target size={80} className={styles.target} />
          <div className={styles.sparkles}>
            <div className={styles.sparkle1}></div>
            <div className={styles.sparkle2}></div>
            <div className={styles.sparkle3}></div>
            <div className={styles.sparkle4}></div>
          </div>
        </div>
      </div>
      <h2 className={styles.title}>¡Bien hecho!</h2>
      <p className={styles.message}>
        Has completado tus tareas. Tómate tu tiempo y recupera fuerzas.
      </p>
      <button className={styles.addButton} onClick={onAddActivity}>
        <Plus size={16} />
        Añadir nueva actividad
      </button>
    </div>
  );
};

export default EmptyState;
