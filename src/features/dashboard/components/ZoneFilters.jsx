import React from 'react';
import { Flag, MessageSquareText } from 'lucide-react';
import PanelCard from './ui/PanelCard/PanelCard';
import Select from '@components/ui/Select';
import styles from './ZoneFilters.module.css';

const periodOptions = [
  { value: 'Últ. trimestre', label: 'Últ. trimestre' },
  { value: 'Mes', label: 'Mes' },
  { value: 'Semana', label: 'Semana' },
];

const viewOptions = [
  { value: 'Por barrio', label: 'Por barrio' },
  { value: 'Por zona', label: 'Por zona' },
];

const ZoneFilters = ({ period, view, onChangePeriod, onChangeView, className = '' }) => {
  const handlePeriodChange = ({ target }) => {
    onChangePeriod?.(target.value);
  };

  const handleViewChange = ({ target }) => {
    onChangeView?.(target.value);
  };

  return (
    <PanelCard title="Análisis de ventas" className={className} bodyClassName={styles.body}>
      <p className={styles.subtitle}>Ajusta los filtros para explorar resultados y tendencias.</p>
      <div className={styles.row}>
        <div className={styles.iconBadge}>
          <Flag size={16} />
        </div>
        <div className={styles.rowContent}>
          <div className={styles.rowTitle}>Segmento geográfico</div>
          <div className={styles.rowDescription}>Selecciona el período para comparar el desempeño por zonas.</div>
        </div>
        <Select
          value={period}
          onChange={handlePeriodChange}
          options={periodOptions}
          size="small"
          name="zone-period"
          wrapperClassName={styles.selectInline}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.iconBadge}>
          <MessageSquareText size={16} />
        </div>
        <div className={styles.rowContent}>
          <div className={styles.rowTitle}>Vista de indicador</div>
          <div className={styles.rowDescription}>Elige cómo agrupar las ventas para profundizar el análisis.</div>
        </div>
        <Select
          value={view}
          onChange={handleViewChange}
          options={viewOptions}
          size="small"
          name="zone-view"
          wrapperClassName={styles.selectInline}
        />
      </div>
    </PanelCard>
  );
};

export default ZoneFilters;


