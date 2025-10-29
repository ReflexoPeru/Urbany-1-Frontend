import React from 'react';
import styles from './StageItem.module.css';

const StageItem = ({ name, progress }) => (
  <div className={styles.stageItem}>
    <span className={styles.stageName}>{name}</span>
    <div className={styles.stageProgress}>
      <div 
        className={styles.stageProgressFill}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <span className={styles.stagePercentage}>{progress}%</span>
  </div>
);

export default StageItem;