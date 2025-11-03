import { MapPinLine, PhoneCall, Star, X } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './NetworkPropertyDetailsModal.module.css'

const NetworkPropertyDetailsModal = ({
    isOpen,
    property,
    onClose,
    onToggleFavorite,
    onRemove,
    onViewExternal
}) => {
    if (!isOpen || !property) {
        return null
    }

    const handleFavorite = () => {
        onToggleFavorite?.(property)
    }

    const handleRemove = () => {
        onRemove?.(property)
    }

    const handleViewExternal = () => {
        onViewExternal?.(property)
    }

    const priceLabel = new Intl.NumberFormat('es-CO', {
        style: property.currency === 'COP' ? 'currency' : 'decimal',
        currency: property.currency === 'COP' ? 'COP' : undefined,
        maximumFractionDigits: property.currency === 'COP' ? 0 : 2
    }).format(property.price ?? 0)

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.headerInfo}>
                        <span className={styles.operation}>{property.operation}</span>
                        <h2 className={styles.title}>{property.address}</h2>
                        <p className={styles.subtitle}>
                            <MapPinLine size={16} weight="bold" />
                            {property.city} · {property.neighborhood}
                        </p>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        <X size={20} weight="bold" />
                    </button>
                </header>

                <div className={styles.content}>
                    <div className={styles.photoPanel}>
                        {property.image ? (
                            <img src={property.image} alt={property.address} />
                        ) : (
                            <div className={styles.photoFallback}>Sin imagen</div>
                        )}
                        <div className={styles.badgesRow}>
                            <span className={styles.priceBadge}>{priceLabel}</span>
                            <span className={styles.commissionBadge}>{property.commission}% comisión</span>
                        </div>
                    </div>

                    <div className={styles.detailsPanel}>
                        <div className={styles.detailGroup}>
                            <h3>Características</h3>
                            <ul>
                                <li>{property.propertyType}</li>
                                <li>{property.bedrooms ?? 0} dormitorios · {property.bathrooms ?? 0} baños</li>
                                {property.quality && <li>Calidad de publicación: {property.quality}%</li>}
                                {property.coverage && <li>Cobertura: {property.coverage}</li>}
                            </ul>
                        </div>

                        <div className={styles.detailGroup}>
                            <h3>Inmobiliaria</h3>
                            <div className={styles.realEstateCard}>
                                <div className={styles.realEstateInfo}>
                                    <span className={styles.realEstateName}>{property.realEstate?.name ?? 'Sin inmobiliaria'}</span>
                                    {property.contact?.name && <span>{property.contact.name}</span>}
                                    {property.contact?.phone && (
                                        <span className={styles.contactPhone}>
                                            <PhoneCall size={16} weight="bold" />
                                            {property.contact.phone}
                                        </span>
                                    )}
                                </div>
                                <Button variant="secondary" size="small" icon="share" onClick={handleViewExternal}>
                                    Ver ficha
                                </Button>
                            </div>
                        </div>

                        {property.description && (
                            <div className={styles.detailGroup}>
                                <h3>Descripción</h3>
                                <p>{property.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                <footer className={styles.footer}>
                    <button type="button" className={styles.secondaryButton} onClick={handleFavorite}>
                        <Star size={18} weight={property.isFavorite ? 'fill' : 'regular'} />
                        {property.isFavorite ? 'Marcada como favorita' : 'Marcar favorita'}
                    </button>

                    <div className={styles.footerActions}>
                        <button type="button" className={styles.secondaryButton} onClick={onClose}>
                            Cerrar
                        </button>
                        <Button variant="danger" size="medium" icon="trash" onClick={handleRemove}>
                            Eliminar de la red
                        </Button>
                        <Button variant="primary" size="medium" iconPosition="right" icon="eye" onClick={handleViewExternal}>
                            Abrir
                        </Button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default NetworkPropertyDetailsModal


