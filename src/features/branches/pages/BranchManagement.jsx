import React from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/ui/Button';
import illustrationImage from '../../../assets/images/optimizations/undraw_dev-productivity_5wps.svg';
import styles from './BranchManagement.module.css';

const BranchManagement = () => {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <div className={styles.badgeWrapper}>
          <Badge variant="warning" size="medium">
            Licencia Profesional
          </Badge>
        </div>

        <h1 className={styles.title}>Gestión de Sucursales</h1>

        <p className={styles.subtitle}>
          Organiza tu operación inmobiliaria con sucursales. Asigna propiedades, negocios y contactos para visualizar el
          rendimiento de cada oficina en segundos.
        </p>

        <div className={styles.illustration}>
          <img
            src={illustrationImage}
            alt="Ilustración de gestión de sucursales"
          />
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="large" fullWidth>
            Actualiza a Licencia Profesional
          </Button>
        </div>

        <p className={styles.note}>
          Incluye sucursales ilimitadas y reportes avanzados para tu equipo.
        </p>
      </section>
    </div>
  );
};

export default BranchManagement;