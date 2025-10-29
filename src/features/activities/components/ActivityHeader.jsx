import React from 'react';
import { List, Calendar, Plus } from 'lucide-react';
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
          >
            <List size={20} />
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'calendar' ? styles.active : ''}`}
            onClick={() => onViewModeChange('calendar')}
          >
            <Calendar size={20} />
          </button>
        </div>
        <button className={styles.addButton} onClick={onAddActivity}>
          <Plus size={16} />
          Añadir nueva actividad
        </button>
      </div>
    </div>
  );
};

export default ActivityHeader;
