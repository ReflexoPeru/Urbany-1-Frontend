import React from 'react'
import { X, Phone, Mail, MapPin, Calendar, User, Tag } from 'lucide-react'
import styles from './ViewDealModal.module.css'

const ViewDealModal = ({ deal, isOpen, onClose }) => {
  if (!isOpen || !deal) return null

  const formatDate = (iso) => {
    const [year, month, day] = iso.split('-')
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Detalles del Negocio</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información Personal</h3>
            <div className={styles.field}>
              <User className={styles.icon} size={16} />
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{deal.name}</span>
            </div>
            <div className={styles.field}>
              <Phone className={styles.icon} size={16} />
              <span className={styles.label}>Teléfono:</span>
              <span className={styles.value}>{deal.contact.phone}</span>
            </div>
            <div className={styles.field}>
              <Mail className={styles.icon} size={16} />
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{deal.contact.email}</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información de la Propiedad</h3>
            <div className={styles.field}>
              <MapPin className={styles.icon} size={16} />
              <span className={styles.label}>Dirección:</span>
              <span className={styles.value}>{deal.property.address}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Operación:</span>
              <span className={`${styles.value} ${styles.operation}`}>{deal.property.operation}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Estado:</span>
              <span className={`${styles.value} ${styles.status}`}>{deal.property.status}</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información del Negocio</h3>
            <div className={styles.field}>
              <Calendar className={styles.icon} size={16} />
              <span className={styles.label}>Fecha:</span>
              <span className={styles.value}>{formatDate(deal.date)}</span>
            </div>
            <div className={styles.field}>
              <User className={styles.icon} size={16} />
              <span className={styles.label}>Agente:</span>
              <span className={styles.value}>{deal.agent}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Etapa:</span>
              <span className={`${styles.value} ${styles.stage}`}>{deal.stage}</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Etiquetas</h3>
            <div className={styles.tags}>
              {deal.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewDealModal
