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
          <Button
            variant={viewMode === 'list' ? 'success' : 'secondary'}
            size="small"
            className={styles.viewButton}
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
          >
            <List size={18} />
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'success' : 'secondary'}
            size="small"
            className={styles.viewButton}
            onClick={() => onViewModeChange('calendar')}
            aria-pressed={viewMode === 'calendar'}
          >
            <Calendar size={18} />
          </Button>
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
