import React from 'react'
import { Plus, FileText } from 'lucide-react'
import styles from './EmptyTableState.module.css'

const EmptyTableState = ({ onAddNew }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.iconContainer}>
        <FileText className={styles.icon} size={48} />
      </div>
      <h3 className={styles.title}>No se encontraron negocios</h3>
      <p className={styles.description}>
        Comienza agregando tu primer negocio para empezar a gestionar tus tratos.
      </p>
      <button className={styles.addButton} onClick={onAddNew}>
        <Plus size={20} />
        Agregar Nuevo Negocio
      </button>
    </div>
  )
}

export default EmptyTableState
