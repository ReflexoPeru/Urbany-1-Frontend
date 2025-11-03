import React from 'react';
import { IconSparkles } from '@tabler/icons-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/ui/Button';
import CategoryPill from '../components/CategoryPill';
import styles from '../components/Optimizations.module.css';
import productivityImage from '../../../assets/images/optimizations/undraw_dev-productivity_5wps.svg';

export default function OptimizationsView() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <Badge variant="warning" size="medium">
              Optimizaciones
            </Badge>
          </div>

          <h1 className={styles.title}>Diagnósticos para impulsar tu CRM</h1>

          <p className={styles.subtitle}>
            Revisa sugerencias inteligentes para mejorar tus publicaciones, mantener tus negocios actualizados y dar
            seguimiento a cada oportunidad.
          </p>

          <div className={styles.actions}>
            <Button variant="primary" size="large">
              Revisar categorías
            </Button>
            <Button
              variant="secondary"
              size="large"
              className={styles.secondaryButton}
            >
              <IconSparkles size={18} />
              Ver recomendaciones
            </Button>
          </div>

          <p className={styles.note}>Los diagnósticos se actualizan automáticamente cada hora.</p>
        </div>

        <div className={styles.heroImage}>
          <img
            src={productivityImage}
            alt="Ilustración de optimización"
          />
        </div>
      </section>

      <div className={styles.panel}>
        <aside className={styles.sidebar}>
          <h4 className={styles.sidebarTitle}>Categorías</h4>
          <div className={styles.pills}>
            <CategoryPill active>MercadoLibre</CategoryPill>
            <CategoryPill>Portales inmobiliarios</CategoryPill>
            <CategoryPill>Negocios</CategoryPill>
          </div>
        </aside>

        <div className={styles.cardArea}>
        </div>
      </div>
    </div>
  );
}
