import React, { useMemo, useState } from 'react';
import styles from './SubscriptionPage.module.css';

const PLANES = [
  {
    id: 'esencial',
    nombre: 'ESENCIAL',
    precioMensual: 24.99,
    caracteristicas: [
      'Propiedades ilimitadas',
      'Página web auto-administrable',
      'Red inmobiliaria',
      'Certificado SSL en sitio web',
      'Correos electrónicos: 5',
      'Usuarios: 2',
      'Portales gratuitos',
      'Portales premium: 2',
    ],
  },
  {
    id: 'avanzado',
    nombre: 'AVANZADO',
    precioMensual: 44.99,
    caracteristicas: [
      'Propiedades ilimitadas',
      'Proyectos ilimitados',
      'Página web auto-administrable',
      'Red inmobiliaria',
      'Blog auto-administrable',
      'Certificado SSL en sitio web',
      'Correos electrónicos: 7',
      'Usuarios: 4',
      'Portales gratuitos',
      'Portales premium: Todos',
      'Redes Inmobiliarias Privadas',
      'Gestión de negocios',
      'Gestión de tasaciones y Análisis',
      'Comparativo de Mercado (ACM)',
      'Landing page de propiedades',
    ],
  },
  {
    id: 'profesional',
    nombre: 'PROFESIONAL',
    precioMensual: 72.99,
    caracteristicas: [
      'Propiedades ilimitadas',
      'Proyectos ilimitados',
      'Página web auto-administrable',
      'Red inmobiliaria',
      'Blog auto-administrable',
      'Certificado SSL en sitio web',
      'Correos electrónicos: 9',
      'Usuarios: 6',
      'Portales gratuitos',
      'Portales premium',
      'Redes Inmobiliarias Privadas',
      'Gestión de negocios',
      'Gestión de tasaciones y Análisis',
      'Comparativo de Mercado (ACM)',
      'Gestión de sucursales',
      'Landing page de propiedades',
      'Respuestas automáticas',
      'Integración de calendario',
      'Integración de email',
      'Gestión de sucursales',
    ],
  },
];

function calcularPrecio(periodo, precioMensual) {
  if (periodo === 'anual') {
    // 12 meses con 17% de descuento
    const anual = precioMensual * 12 * 0.83;
    return anual;
  }
  return precioMensual;
}

const Price = ({ value, periodo }) => {
  const etiqueta = periodo === 'anual' ? 'POR AÑO' : 'POR MES';
  const formado = useMemo(() => value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }), [value]);
  return (
    <div className={styles.precioWrap}>
      <span className={styles.precio}>U$D{formado}</span>
      <span className={styles.periodoUpper}> {etiqueta}</span>
    </div>
  );
};

const PlanCard = ({ plan, periodo, isSelected, onSelect }) => {
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
};

export default function SubscriptionPage() {
  const [periodo, setPeriodo] = useState('mensual'); // 'mensual' | 'anual'
  const [planSeleccionado, setPlanSeleccionado] = useState(null); // 'esencial' | 'avanzado' | 'profesional'

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
          <div className={styles.switch} aria-hidden="true">
            <span className={styles.knob} style={{ left: periodo === 'mensual' ? '2px' : '26px' }} />
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
        {PLANES.map((p) => (
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