import React from 'react';
import { Banknote } from 'lucide-react';
import PanelCard from './ui/PanelCard/PanelCard';
import styles from './WalletValue.module.css';

const WalletValue = ({ valuePen, className = '' }) => {
  const formatted = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(valuePen || 0);

  return (
    <PanelCard className={className} bodyClassName={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <Banknote size={40} />
        </div>
        <div className={styles.value}>{formatted}</div>
        <div className={styles.label}>Valor de la cartera</div>
      </div>
    </PanelCard>
  );
};

export default WalletValue;


