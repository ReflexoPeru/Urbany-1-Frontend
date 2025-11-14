import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/ui/Button';
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal';
import { useToast } from '../../../contexts/ToastContext';
import illustrationImage from '../../../assets/images/optimizations/undraw_dev-productivity_5wps.svg';
import styles from './BranchManagement.module.css';

const BranchManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const handleConfirmUpgrade = () => {
    setShowUpgradeModal(false);
    toast.info('Equipo comercial notificado', 'Te contactaremos para activar la licencia profesional.');
    navigate('/subscription');
  };

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
          <img src={illustrationImage} alt="Ilustración de gestión de sucursales" />
        </div>

        <Button variant="primary" size="large" onClick={handleUpgrade}>
          Actualiza a Licencia Profesional
        </Button>

        <p className={styles.note}>
          Incluye sucursales ilimitadas y reportes avanzados para tu equipo.
        </p>
      </section>

      <ConfirmModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onConfirm={handleConfirmUpgrade}
        title="Actualizar licencia"
        message="Con la licencia profesional podrás crear sucursales ilimitadas y acceder a reportes avanzados. ¿Deseas que nuestro equipo habilite la actualización?"
        confirmText="Solicitar actualización"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default BranchManagement;