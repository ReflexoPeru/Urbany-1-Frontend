import React from 'react';
import { List, Calendar } from 'lucide-react';
import Button from '../../../components/ui/Button';
import styles from './ActivityHeader.module.css';

const ActivityHeader = ({ viewMode, onViewModeChange, onAddActivity }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Actividades</h1>
      <div className={styles.controls}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
          >
            <List size={18} />
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'calendar' ? styles.active : ''}`}
            onClick={() => onViewModeChange('calendar')}
            aria-pressed={viewMode === 'calendar'}
          >
            <Calendar size={18} />
          </button>
        </div>
        <Button
          variant="primary"
          size="medium"
          icon="plus"
          onClick={onAddActivity}
        >
          Añadir nueva actividad
        </Button>
      </div>
    </div>
  );
};

export default ActivityHeader;
