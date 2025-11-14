import React from 'react'
import { Plus } from 'lucide-react'
import ventureIllustration from '../../../assets/emprendimentos/emprendimiento.svg'
import styles from './EmptyTableState.module.css'

const EmptyTableState = ({ onAddNew }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.illustrationContainer}>
        <img 
          src={ventureIllustration} 
          alt="Emprendimientos" 
          className={styles.illustration}
        />
      </div>
      
      <h3 className={styles.title}>
        No hemos encontrado ningún emprendimiento
      </h3>
      
      <p className={styles.description}>
        Todavía no has cargado uno, ¿quieres añadirlo?
      </p>
      
      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={onAddNew}>
          <Plus size={20} />
          Añadir Nuevo emprendimiento
        </button>
      </div>
    </div>
  )
}

export default EmptyTableState

