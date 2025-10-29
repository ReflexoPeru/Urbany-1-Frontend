import React from 'react'
import styles from './StageTabs.module.css'

const StageTabs = ({ stages, activeStage, onStageChange }) => {
  return (
    <div className={styles.container}>
      {stages.map((stage, idx) => (
        <div key={stage.stage} className={styles.tabGroup}>
          <button
            className={`${styles.tabItem} ${activeStage === stage.stage ? styles.active : ''}`}
            onClick={() => onStageChange(stage.stage)}
          >
            {stage.stage} ({stage.count})
          </button>
          <div className={`${styles.counter} ${activeStage === stage.stage ? styles.counterActive : ''}`}>
            {stage.count}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StageTabs
