import React from 'react'
import { Edit, Trash2 } from 'lucide-react'
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

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.theadRow}>
            <th className={styles.th1}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={allSelected}
                ref={input => {
                  if (input) input.indeterminate = someSelected
                }}
                onChange={onSelectAll}
              />
            </th>
            <th className={styles.th2}>Nombre</th>
            <th className={styles.th3}>Contacto</th>
            <th className={styles.th4}>Propiedad</th>
            <th className={styles.th5}>Fecha</th>
              <th className={styles.th6}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className={styles.row}>
              <td className={styles.td}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedDeals.includes(deal.id)}
                  onChange={() => onSelectDeal(deal.id)}
                />
              </td>
              <td className={styles.td}>
                <div className={styles.cellName}>
                  <span className={styles.muted}>{deal.name}</span>
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.contactLines}>
                  <span className={styles.label}>Teléfono:</span>
                  <span className={styles.mutedSmall}>{deal.contact.phone}</span>
                  <span className={styles.label}>Correo electrónico:</span>
                  <span className={styles.mutedSmall}>{deal.contact.email}</span>
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.success}>
                  {deal.property.operation}, {deal.property.status}
                </div>
                <div className={styles.mutedSmall}>{deal.property.address}</div>
              </td>
              <td className={`${styles.td} ${styles.date}`}>{formatDate(deal.date)}</td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button 
                    className={styles.actionButton} 
                    onClick={() => onViewDeal(deal)}
                    title="Ver detalles"
                  >
                    Ver
                  </button>
                  <button 
                    className={styles.editButton} 
                    onClick={() => onEditDeal(deal)}
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => onDeleteDeal(deal)}
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BusinessTable
