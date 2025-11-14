import React from 'react'
import { X, Phone, Mail, MapPin, Calendar, User, Tag } from 'lucide-react'
import styles from './ViewDealModal.module.css'

const statusLabels = {
  pending: 'Nueva consulta',
  scheduled: 'Visita programada',
  in_progress: 'En tasación',
  completed: 'Completada'
}

const propertyStatusLabels = {
  active: 'Activa',
  reserved: 'Reservada',
  'off-market': 'Fuera de mercado',
  sold: 'Vendida',
  rented: 'Alquilada',
  draft: 'Borrador'
}

const ViewDealModal = ({ deal, isOpen, onClose, entityType = 'deal' }) => {
  if (!isOpen || !deal) return null
  const isAppraisal = entityType === 'appraisal'
  const isProperty = entityType === 'property'

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

  const formatPrice = (value, currency) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
      return '--'
    }
    const amount = Number(value)
    const formatted = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0 }).format(amount)
    return `${currency ?? ''} ${formatted}`.trim()
  }

  const getTitle = () => {
    if (isAppraisal) return 'Detalles de la Tasación'
    if (isProperty) return 'Detalles de la Propiedad'
    return 'Detalles del Negocio'
  }

  const portalList = Array.isArray(deal.portals)
    ? deal.portals
    : deal.portals
    ? [deal.portals]
    : []

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{getTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          {isProperty ? (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Información de la propiedad</h3>
                <div className={styles.field}>
                  <MapPin className={styles.icon} size={16} />
                  <span className={styles.label}>Dirección:</span>
                  <span className={styles.value}>{deal.address || '-'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Ciudad:</span>
                  <span className={styles.value}>{deal.city || '-'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Tipo:</span>
                  <span className={styles.value}>{deal.propertyType || '-'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Categoría:</span>
                  <span className={styles.value}>{deal.category || '-'}</span>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Estado y valoración</h3>
                <div className={styles.field}>
                  <span className={styles.label}>Precio:</span>
                  <span className={styles.value}>{formatPrice(deal.price, deal.currency)}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Estado:</span>
                  <span className={`${styles.value} ${styles.status}`}>
                    {propertyStatusLabels[deal.status] || deal.status || 'Sin estado'}
                  </span>
                </div>
                {deal.quality !== undefined && deal.quality !== null && (
                  <div className={styles.field}>
                    <span className={styles.label}>Calidad:</span>
                    <span className={styles.value}>{deal.quality}%</span>
                  </div>
                )}
                {deal.code && (
                  <div className={styles.field}>
                    <span className={styles.label}>Código interno:</span>
                    <span className={styles.value}>{deal.code}</span>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Portales</h3>
                <div className={styles.tags}>
                  {portalList.length > 0 ? (
                    portalList.map((portal, index) => (
                      <span key={index} className={styles.tag}>
                        <Tag size={12} />
                        {portal}
                      </span>
                    ))
                  ) : (
                    <span className={styles.value}>Sin difundir</span>
                  )}
                </div>
              </div>
            </>
          ) : isAppraisal ? (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Información del cliente</h3>
                <div className={styles.field}>
                  <User className={styles.icon} size={16} />
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{deal.name}</span>
                </div>
                <div className={styles.field}>
                  <Phone className={styles.icon} size={16} />
                  <span className={styles.label}>Teléfono:</span>
                  <span className={styles.value}>{deal.contact?.phone || '-'}</span>
                </div>
                <div className={styles.field}>
                  <Mail className={styles.icon} size={16} />
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{deal.contact?.email || '-'}</span>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Información de la tasación</h3>
                <div className={styles.field}>
                  <MapPin className={styles.icon} size={16} />
                  <span className={styles.label}>Dirección:</span>
                  <span className={styles.value}>{deal.property?.address || '-'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Tipo:</span>
                  <span className={styles.value}>{deal.propertyType}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Rango estimado:</span>
                  <span className={styles.value}>{deal.valueRange || 'Sin definir'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Estado:</span>
                  <span className={`${styles.value} ${styles.status}`}>{statusLabels[deal.status] || deal.status}</span>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Seguimiento</h3>
                <div className={styles.field}>
                  <Calendar className={styles.icon} size={16} />
                  <span className={styles.label}>Fecha de visita:</span>
                  <span className={styles.value}>{deal.visitDate ? formatDate(deal.visitDate) : 'Sin definir'}</span>
                </div>
                <div className={styles.field}>
                  <User className={styles.icon} size={16} />
                  <span className={styles.label}>Asesor:</span>
                  <span className={styles.value}>{deal.agent}</span>
                </div>
                {deal.lastUpdate && (
                  <div className={styles.field}>
                    <Calendar className={styles.icon} size={16} />
                    <span className={styles.label}>Última actualización:</span>
                    <span className={styles.value}>{formatDate(deal.lastUpdate)}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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
