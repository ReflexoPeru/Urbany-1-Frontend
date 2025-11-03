import React from 'react'
import Card from '../../../components/ui/Card/Card'
import styles from './StageTabs.module.css'

const StageTabs = ({ stages = [], activeStage, onStageChange }) => {
  if (!stages?.length) {
    return null
  }

  return (
    <div className={styles.container} role="tablist" aria-label="Estado del emprendimiento">
      {stages.map((stage) => {
        const isActive = activeStage === stage.stage
        const count = Number.isFinite(stage.count) ? stage.count : 0

        return (
          <Card
            key={stage.stage}
            className={`${styles.stageCard} ${isActive ? styles.active : ''}`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              className={styles.cardButton}
              onClick={() => onStageChange(stage.stage)}
            >
              <span className={styles.stageLabel}>{stage.stage}</span>
              <span className={styles.stageCount}>{count}</span>
            </button>
          </Card>
        )
      })}
    </div>
  )
}

export default StageTabs

