import { useEffect, useMemo, useState } from 'react'
import { MapPinLine, PhoneCall, Star, X } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './NetworkPropertyDetailsModal.module.css'

const currencyOptions = ['COP', 'USD', 'EUR']
const coverageOptions = ['Exclusiva', 'Compartida', 'General']

const formatPrice = (value, currency) => {
    const numeric = Number(value ?? 0)
    if (Number.isNaN(numeric)) {
        return 'Sin precio'
    }
    try {
        if (currency && ['COP', 'USD', 'EUR'].includes(currency)) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency,
                maximumFractionDigits: currency === 'COP' ? 0 : 2
            }).format(numeric)
        }
        return new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: 0
        }).format(numeric)
    } catch {
        return String(numeric)
    }
}

const buildFormValues = (property) => ({
    price: property.price ?? '',
    currency: property.currency || 'COP',
    commission: property.commission ?? '',
    coverage: property.coverage || '',
    description: property.description || '',
    contactName: property.contact?.name || '',
    contactPhone: property.contact?.phone || ''
})

const NetworkPropertyDetailsModal = ({
    isOpen,
    property,
    initialMode = 'view',
    onClose,
    onToggleFavorite,
    onRemove,
    onViewExternal,
    onViewRealEstate,
    onUpdate
}) => {
    const [isEditing, setIsEditing] = useState(initialMode === 'edit')
    const [formValues, setFormValues] = useState(property ? buildFormValues(property) : buildFormValues({}))

    useEffect(() => {
        if (isOpen && property) {
            setFormValues(buildFormValues(property))
            setIsEditing(initialMode === 'edit')
        } else {
            setIsEditing(false)
        }
    }, [isOpen, property, initialMode])

    if (!isOpen || !property) {
        return null
    }

    const displayPrice = isEditing ? formValues.price : property.price
    const displayCurrency = isEditing ? formValues.currency : property.currency
    const priceLabel = formatPrice(displayPrice, displayCurrency)
    const commissionLabel = `${isEditing ? formValues.commission ?? property.commission ?? 0 : property.commission}% comisión`

    const handleFavorite = () => {
        onToggleFavorite?.(property)
    }

    const handleRemove = () => {
        onRemove?.(property)
    }

    const handleViewExternal = () => {
        onViewExternal?.(property)
    }

    const handleViewRealEstate = () => {
        onViewRealEstate?.(property)
    }

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleChange = (field) => (event) => {
        const { value } = event.target
        setFormValues((previous) => ({
            ...previous,
            [field]: value
        }))
    }

    const handleCancelEdit = () => {
        if (property) {
            setFormValues(buildFormValues(property))
        }
        setIsEditing(false)
    }

    const handleSave = () => {
        if (!onUpdate) {
            setIsEditing(false)
            return
        }
        const updates = {
            price: formValues.price === '' ? null : Number(formValues.price),
            currency: formValues.currency,
            commission: formValues.commission === '' ? null : Number(formValues.commission),
            coverage: formValues.coverage,
            description: formValues.description,
            contact: {
                name: formValues.contactName,
                phone: formValues.contactPhone
            }
        }
        onUpdate(property.id, updates)
        setIsEditing(false)
    }

    const priceBadge = priceLabel

    const readOnlyContent = (
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
                    <Button variant="secondary" size="small" icon="share" onClick={handleViewRealEstate}>
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
    )

    const editableContent = (
        <div className={styles.editGrid}>
            <div className={styles.fieldRow}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="edit-price">Precio</label>
                    <input
                        id="edit-price"
                        type="number"
                        className={styles.input}
                        value={formValues.price}
                        onChange={handleChange('price')}
                        placeholder="Ej. 4200000"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="edit-currency">Moneda</label>
                    <select
                        id="edit-currency"
                        className={styles.select}
                        value={formValues.currency}
                        onChange={handleChange('currency')}
                    >
                        {currencyOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="edit-commission">Comisión (%)</label>
                    <input
                        id="edit-commission"
                        type="number"
                        className={styles.input}
                        value={formValues.commission}
                        onChange={handleChange('commission')}
                        placeholder="Ej. 30"
                        min="0"
                        max="100"
                    />
                </div>
            </div>

            <div className={styles.fieldRow}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="edit-coverage">Cobertura</label>
                    <select
                        id="edit-coverage"
                        className={styles.select}
                        value={formValues.coverage}
                        onChange={handleChange('coverage')}
                    >
                        {[...(formValues.coverage && !coverageOptions.includes(formValues.coverage) ? [formValues.coverage] : []), ...coverageOptions]
                            .filter((value, index, self) => self.indexOf(value) === index)
                            .map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="edit-contact-name">Contacto</label>
                    <input
                        id="edit-contact-name"
                        type="text"
                        className={styles.input}
                        value={formValues.contactName}
                        onChange={handleChange('contactName')}
                        placeholder="Ej. Ana Torres"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="edit-contact-phone">Teléfono</label>
                    <input
                        id="edit-contact-phone"
                        type="tel"
                        className={styles.input}
                        value={formValues.contactPhone}
                        onChange={handleChange('contactPhone')}
                        placeholder="Ej. +57 300 000 0000"
                    />
                </div>
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="edit-description">Descripción</label>
                <textarea
                    id="edit-description"
                    rows={3}
                    className={styles.textarea}
                    value={formValues.description}
                    onChange={handleChange('description')}
                    placeholder="Agrega notas o detalles relevantes sobre la propiedad."
                />
            </div>
        </div>
    )

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
                            <span className={styles.priceBadge}>{priceBadge}</span>
                            <span className={styles.commissionBadge}>{commissionLabel}</span>
                        </div>
                    </div>

                    {isEditing ? editableContent : readOnlyContent}
                </div>

                <footer className={styles.footer}>
                    <button type="button" className={styles.secondaryButton} onClick={handleFavorite}>
                        <Star size={18} weight={property.isFavorite ? 'fill' : 'regular'} />
                        {property.isFavorite ? 'Marcada como favorita' : 'Marcar favorita'}
                    </button>

                    {isEditing ? (
                        <div className={styles.footerActions}>
                            <Button variant="ghost" size="medium" onClick={handleCancelEdit}>
                                Cancelar
                            </Button>
                            <Button variant="primary" size="medium" onClick={handleSave}>
                                Guardar cambios
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.footerActions}>
                            <button type="button" className={styles.secondaryButton} onClick={onClose}>
                                Cerrar
                            </button>
                            <Button variant="ghost" size="medium" onClick={handleEditClick}>
                                Editar
                            </Button>
                            <Button variant="danger" size="medium" icon="trash" onClick={handleRemove}>
                                Eliminar de la red
                            </Button>
                            <Button variant="primary" size="medium" iconPosition="right" icon="eye" onClick={handleViewExternal}>
                                Abrir
                            </Button>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    )
}

export default NetworkPropertyDetailsModal


