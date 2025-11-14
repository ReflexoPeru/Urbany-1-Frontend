import React, { useEffect, useRef } from 'react'
import { Edit, Eye, Trash2 } from 'lucide-react'
import ventureIllustration from '../../../assets/emprendimentos/emprendimiento.svg'
import styles from './VenturesTable.module.css'

const formatDate = (iso) => {
  if (!iso) return 'Sin fecha'
  const date = new Date(iso)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const VenturesTable = ({ ventures, selectedVentures, onSelectVenture, onSelectAll, onViewVenture, onEditVenture, onDeleteVenture }) => {
  const allSelected = ventures.length > 0 && selectedVentures.length === ventures.length
  const someSelected = selectedVentures.length > 0 && selectedVentures.length < ventures.length
  const headerCheckboxRef = useRef(null)

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected
    }
  }, [someSelected])

  const gridTemplate = '56px 120px 1.8fr 1.5fr 1fr 1fr 140px'

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <div
          className={styles.table}
          style={{ '--grid-template-columns': gridTemplate }}
          role="table"
        >
          <div className={styles.headerRow} role="row">
            <div
              className={`${styles.headerCell} ${styles.checkboxCell} ${styles.headerCellCheckbox}`}
              role="columnheader"
            >
              <input
                type="checkbox"
                ref={headerCheckboxRef}
                className={styles.checkboxControl}
                checked={allSelected}
                onChange={onSelectAll}
                aria-label="Seleccionar todos los emprendimientos"
              />
            </div>
            <div className={styles.headerCell} role="columnheader">
              Imagen
            </div>
            <div className={styles.headerCell} role="columnheader">
              Título
            </div>
            <div className={styles.headerCell} role="columnheader">
              Ubicación
            </div>
            <div className={styles.headerCell} role="columnheader">
              Etapa
            </div>
            <div className={styles.headerCell} role="columnheader">
              Fecha
            </div>
            <div className={`${styles.headerCell} ${styles.headerCellActions}`} role="columnheader">
              Acciones
            </div>
          </div>

          <div className={styles.body} role="rowgroup">
            {ventures.map((venture) => {
              const isSelected = selectedVentures.includes(venture.id)

              return (
                <div
                  key={venture.id}
                  className={`${styles.bodyRow} ${isSelected ? styles.selectedRow : ''}`}
                  role="row"
                >
                  <div className={`${styles.cell} ${styles.checkboxCell}`} role="cell">
                    <input
                      type="checkbox"
                      className={styles.checkboxControl}
                      checked={isSelected}
                      onChange={() => onSelectVenture(venture.id)}
                      aria-label={`Seleccionar ${venture.title}`}
                    />
                  </div>

                  <div className={`${styles.cell} ${styles.imageCell}`} role="cell">
                    <img 
                      src={venture.imageUrl || ventureIllustration} 
                      alt={venture.title}
                      className={styles.ventureImage}
                    />
                  </div>

                  <div className={`${styles.cell} ${styles.titleCell}`} role="cell">
                    <span className={styles.titlePrimary}>{venture.title}</span>
                    <span className={styles.titleMeta}>
                      {venture.tag && <span className={styles.tagLabel}>{venture.tag}</span>}
                      {venture.administrator && <span>{venture.administrator}</span>}
                    </span>
                  </div>

                  <div className={`${styles.cell} ${styles.locationCell}`} role="cell">
                    <span className={styles.locationValue}>{venture.location || 'Sin ubicación'}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.stageCell}`} role="cell">
                    <span className={styles.stageTag}>{venture.stage || 'Sin etapa'}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.dateCell}`} role="cell">
                    <span className={styles.dateValue}>{formatDate(venture.createdAt)}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.actionsCell}`} role="cell">
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => onViewVenture(venture)}
                      title="Ver detalles"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => onEditVenture(venture)}
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.actionButton} ${styles.danger}`}
                      onClick={() => onDeleteVenture(venture)}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenturesTable

