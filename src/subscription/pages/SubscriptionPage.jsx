import React, { useState } from 'react';
import styles from './SubscriptionPage.module.css';
import PlanCard from '../components/PlanCard.jsx';
import { getPlans } from '../services/plansService.js';

export default function SubscriptionPage() {
  const [periodo, setPeriodo] = useState('mensual'); // 'mensual' | 'anual'
  const [planSeleccionado, setPlanSeleccionado] = useState(null); // 'esencial' | 'avanzado' | 'profesional'

  const planes = getPlans();

  const handleSeleccionarPlan = (planId) => {
    setPlanSeleccionado(planId);
    console.log(`Plan seleccionado: ${planId}, Período: ${periodo}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gestiona tu suscripción</h1>
        </header>

        <div className={styles.integrationBox}>
          <div className={styles.integrationLeft}>
            <div className={styles.iconRow}>
              <span className={styles.roundIcon}>💬</span>
              <span className={styles.roundIcon}>📱</span>
              <span className={styles.roundIcon}>➡️</span>
            </div>
            <div>
              <h2 className={styles.integrationTitle}>2clics | WhatsApp</h2>
              <p className={styles.integrationDesc}>
                Simplifica tu comunicación con tus clientes y posibles compradores con una línea de WhatsApp que centralice todos los chats dentro del CRM.
              </p>
            </div>
          </div>
          <div className={styles.integrationRight}>
            <button className={styles.primary}>Solicita integración</button>
            <button className={styles.secondary}>Ver cómo funciona</button>
          </div>
        </div>

        <div className={styles.periodoToggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${periodo === 'mensual' ? styles.toggleBtnActive : ''}`}
            onClick={() => setPeriodo('mensual')}
          >
            Pago mensual
          </button>
          <div
            className={styles.switch}
            role="switch"
            aria-checked={periodo === 'anual'}
            tabIndex={0}
            onClick={() => setPeriodo(periodo === 'mensual' ? 'anual' : 'mensual')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setPeriodo(periodo === 'mensual' ? 'anual' : 'mensual');
              }
            }}
            aria-label="Cambiar período de pago"
          >
            <span
              className={styles.knob}
              style={{ left: periodo === 'mensual' ? '2px' : '26px' }}
            />
          </div>
          <button
            type="button"
            className={`${styles.toggleBtn} ${periodo === 'anual' ? styles.toggleBtnActive : ''}`}
            onClick={() => setPeriodo('anual')}
          >
            Pago anual
          </button>
          <span className={styles.badge}>Ahorra 17%</span>
        </div>

        <section className={styles.grid}>
          {planes.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              periodo={periodo}
              isSelected={planSeleccionado === p.id}
              onSelect={() => handleSeleccionarPlan(p.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}