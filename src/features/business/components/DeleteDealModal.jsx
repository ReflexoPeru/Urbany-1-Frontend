import React from 'react'
import { X, AlertTriangle } from 'lucide-react'
import styles from './DeleteDealModal.module.css'

const DeleteDealModal = ({ deal, isOpen, onClose, onConfirm, isBulkDelete = false }) => {
  if (!isOpen || !deal) return null

  const handleConfirm = () => {
    if (isBulkDelete) {
      onConfirm(deal.id)
    } else {
      onConfirm(deal.id)
    }
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <AlertTriangle className={styles.icon} size={24} />
            <h2 className={styles.title}>
              {isBulkDelete ? 'Eliminar Negocios' : 'Eliminar Negocio'}
            </h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.message}>
            {isBulkDelete 
              ? `¿Estás seguro de que deseas eliminar ${deal.name}?`
              : `¿Estás seguro de que deseas eliminar el negocio de ${deal.name}?`
            }
          </p>
          <p className={styles.warning}>
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.deleteButton} onClick={handleConfirm}>
            {isBulkDelete ? 'Eliminar Todos' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteDealModal
