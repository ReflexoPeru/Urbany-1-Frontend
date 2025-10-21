import React from 'react';
import CategoryPill from '../components/CategoryPill';
import EmptyStateCard from '../components/EmptyStateCard';
import styles from '../components/Optimizations.module.css';
import undrawImage from '../../../assets/images/optimizations/undraw_dev-productivity_5wps.svg';

export default function OptimizationsView() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Optimizaciones</h1>
          <p className={styles.subtitle}>Mejora el uso del CRM. Desde aquí podrás corregir propiedades, publicaciones y negocios.</p>
        </div>
      </header>

      <div className={styles.row}>
        <aside className={styles.sidebar}>
          <h4 className={styles.sidebarTitle}>CATEGORÍAS</h4>
          <div className={styles.categoriesBox}>
            <CategoryPill active>MercadoLibre</CategoryPill>
          </div>
        </aside>

        <main className={styles.content}>
          <EmptyStateCard title="Avisos por corregir el MercadoLibre" imageSrc={undrawImage}>
            <p>🎉 ¡Fantástico! No tienes avisos por republicar. Puedes continuar con tus tareas del día.</p>
          </EmptyStateCard>
        </main>
      </div>
    </div>
  );
}
