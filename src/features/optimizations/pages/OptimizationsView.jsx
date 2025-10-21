import React from 'react';
import CategoryPill from '../components/CategoryPill';
import EmptyStateCard from '../components/EmptyStateCard';
import styles from '../components/Optimizations.module.css';
import undrawImage from '../../../assets/images/optimizations/undraw_dev-productivity_5wps.svg';

export default function OptimizationsView() {
  return (
    <>
      {/* Header con título y descripción directamente en la página */}
      <header className={styles.header}>
        <h1 className={styles.title}>Optimizaciones</h1>
        <p className={styles.subtitle}>Mejora el uso del CRM. Desde aquí podrás corregir propiedades, publicaciones y negocios.</p>
      </header>

      {/* Contenido principal con sidebar y card directamente en la página */}
      <div className={styles.mainContent}>
        {/* Sidebar izquierdo */}
        <aside className={styles.sidebar}>
          <h4 className={styles.sidebarTitle}>CATEGORÍAS</h4>
          <div className={styles.categoriesBox}>
            <CategoryPill active>MercadoLibre</CategoryPill>
          </div>
        </aside>

        {/* Contenido principal centrado */}
        <main className={styles.content}>
          <EmptyStateCard title="Avisos por corregir el MercadoLibre" imageSrc={undrawImage}>
            <div>
              <p>🎉 ¡Fantástico! No tienes avisos por republicar.</p>
              <p>Puedes continuar con tus tareas del día.</p>
            </div>
          </EmptyStateCard>
        </main>
      </div>
    </>
  );
}
