import React, { useEffect, useRef } from 'react'
import { Edit, Eye, Trash2 } from 'lucide-react'
import styles from './BusinessTable.module.css'

const formatDate = (iso) => {
  const [year, month, day] = iso.split('-')
  const d = new Date(year, month - 1, day)

  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

const BusinessTable = ({ deals, selectedDeals, onSelectDeal, onSelectAll, onViewDeal, onEditDeal, onDeleteDeal }) => {
  const allSelected = deals.length > 0 && selectedDeals.length === deals.length
  const someSelected = selectedDeals.length > 0 && selectedDeals.length < deals.length
  const headerCheckboxRef = useRef(null)

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected
    }
  }, [someSelected])

  const gridTemplate = '56px 1.6fr 1.8fr 1.6fr 1fr 140px'

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
                aria-label="Seleccionar todos los negocios"
              />
            </div>
            <div className={styles.headerCell} role="columnheader">
              Nombre
            </div>
            <div className={styles.headerCell} role="columnheader">
              Contacto
            </div>
            <div className={styles.headerCell} role="columnheader">
              Propiedad
            </div>
            <div className={styles.headerCell} role="columnheader">
              Fecha
            </div>
            <div className={`${styles.headerCell} ${styles.headerCellActions}`} role="columnheader">
              Acciones
            </div>
          </div>

          <div className={styles.body} role="rowgroup">
            {deals.map((deal) => {
              const isSelected = selectedDeals.includes(deal.id)

              return (
                <div
                  key={deal.id}
                  className={`${styles.bodyRow} ${isSelected ? styles.selectedRow : ''}`}
                  role="row"
                >
                  <div className={`${styles.cell} ${styles.checkboxCell}`} role="cell">
                    <input
                      type="checkbox"
                      className={styles.checkboxControl}
                      checked={isSelected}
                      onChange={() => onSelectDeal(deal.id)}
                      aria-label={`Seleccionar ${deal.name}`}
                    />
                  </div>

                  <div className={`${styles.cell} ${styles.nameCell}`} role="cell">
                    <span className={styles.namePrimary}>{deal.name}</span>
                    <span className={styles.nameMeta}>
                      {deal.stage && <span className={styles.stageTag}>{deal.stage}</span>}
                      {deal.agent && <span>{deal.agent}</span>}
                    </span>
                  </div>

                  <div className={`${styles.cell} ${styles.contactCell}`} role="cell">
                    <div className={styles.contactRow}>
                      <span className={styles.contactLabel}>Teléfono</span>
                      <span className={styles.contactValue}>{deal.contact?.phone || 'Sin teléfono'}</span>
                    </div>
                    <div className={styles.contactRow}>
                      <span className={styles.contactLabel}>Correo</span>
                      <span className={styles.contactValue}>{deal.contact?.email || 'Sin correo'}</span>
                    </div>
                  </div>

                  <div className={`${styles.cell} ${styles.propertyCell}`} role="cell">
                    <div className={styles.propertyMeta}>
                      {deal.property?.operation && (
                        <span className={styles.propertyTag}>{deal.property.operation}</span>
                      )}
                      {deal.property?.status && (
                        <span className={`${styles.propertyTag} ${styles.statusTag}`}>
                          {deal.property.status}
                        </span>
                      )}
                    </div>
                    <span className={styles.propertyAddress}>{deal.property?.address || 'Sin dirección'}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.dateCell}`} role="cell">
                    <span className={styles.dateValue}>{formatDate(deal.date)}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.actionsCell}`} role="cell">
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => onViewDeal(deal)}
                      title="Ver detalles"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => onEditDeal(deal)}
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.actionButton} ${styles.danger}`}
                      onClick={() => onDeleteDeal(deal)}
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

export default BusinessTable
