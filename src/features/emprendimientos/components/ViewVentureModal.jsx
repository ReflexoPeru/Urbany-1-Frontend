import React from 'react'
import { MapPin, Calendar, User, Building, Tag } from 'lucide-react'
import ventureIllustration from '../../../assets/emprendimentos/emprendimiento.svg'
import Sidebar from '../../../components/ui/Sidebar/Sidebar'
import styles from './ViewVentureModal.module.css'

const ViewVentureModal = ({ venture, isOpen, onClose }) => {
  if (!venture) return null

  const formatDate = (iso) => {
    if (!iso) return 'Sin fecha'
    const date = new Date(iso)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Detalles del Emprendimiento" width={900}>
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img 
            src={venture.imageUrl || ventureIllustration} 
            alt={venture.title} 
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.mainInfo}>
            <h3 className={styles.ventureTitle}>{venture.title}</h3>
            <div className={styles.locationRow}>
              <MapPin className={styles.icon} size={18} />
              <span className={styles.location}>{venture.location}</span>
            </div>
            {venture.tag && (
              <div className={styles.tagRow}>
                <Tag className={styles.icon} size={18} />
                <span className={styles.tag}>{venture.tag}</span>
              </div>
            )}
            {venture.description && (
              <p className={styles.description}>{venture.description}</p>
            )}
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Información General</h4>
            <div className={styles.field}>
              <Calendar className={styles.fieldIcon} size={16} />
              <span className={styles.fieldLabel}>Fecha de creación:</span>
              <span className={styles.fieldValue}>{formatDate(venture.createdAt)}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Etapa:</span>
              <span className={`${styles.fieldValue} ${styles.stage}`}>{venture.stage || 'Sin etapa'}</span>
            </div>
            {venture.deliveryDate && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Fecha de entrega:</span>
                <span className={styles.fieldValue}>{venture.deliveryDate}</span>
              </div>
            )}
            {venture.administrator && (
              <div className={styles.field}>
                <User className={styles.fieldIcon} size={16} />
                <span className={styles.fieldLabel}>Administrador:</span>
                <span className={styles.fieldValue}>{venture.administrator}</span>
              </div>
            )}
          </div>

          {venture.characteristics && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Características</h4>
              <div className={styles.characteristicsGrid}>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Entrega:</span>
                  <span className={styles.charValue}>{venture.characteristics.delivery || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Precio:</span>
                  <span className={styles.charValue}>{venture.characteristics.price || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Unidades:</span>
                  <span className={styles.charValue}>{venture.characteristics.units || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Pisos:</span>
                  <span className={styles.charValue}>{venture.characteristics.floors || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Cocheras:</span>
                  <span className={styles.charValue}>{venture.characteristics.parking || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Departamentos:</span>
                  <span className={styles.charValue}>{venture.characteristics.apartments || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Oficinas:</span>
                  <span className={styles.charValue}>{venture.characteristics.offices || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Locales:</span>
                  <span className={styles.charValue}>{venture.characteristics.stores || 'N/A'}</span>
                </div>
                <div className={styles.characteristicItem}>
                  <span className={styles.charLabel}>Ascensores:</span>
                  <span className={styles.charValue}>{venture.characteristics.elevators || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {venture.amenities && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Comodidades</h4>
              <div className={styles.amenitiesGrid}>
                {venture.amenities.runningWater && (
                  <div className={styles.amenityItem}>
                    <Building className={styles.amenityIcon} size={16} />
                    <span>Agua corriente</span>
                  </div>
                )}
                {venture.amenities.heating && (
                  <div className={styles.amenityItem}>
                    <Building className={styles.amenityIcon} size={16} />
                    <span>Calefacción</span>
                  </div>
                )}
                {venture.amenities.boiler && (
                  <div className={styles.amenityItem}>
                    <Building className={styles.amenityIcon} size={16} />
                    <span>Caldera</span>
                  </div>
                )}
                {venture.amenities.boxDeposit && (
                  <div className={styles.amenityItem}>
                    <Building className={styles.amenityIcon} size={16} />
                    <span>Box/Depósito</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  )
}

export default ViewVentureModal

