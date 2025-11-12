import { useEffect, useMemo, useState } from 'react'
import { X } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './NetworkFormModal.module.css'

const defaultValues = {
    name: '',
    description: '',
    tagColor: '#1d4ed8',
    connectionStatus: 'connected',
    defaultCommission: '',
    sharePolicy: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    syncFrequency: 'Manual'
}

const NetworkFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues = {},
    mode = 'create'
}) => {
    const [formValues, setFormValues] = useState(defaultValues)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setFormValues({
                ...defaultValues,
                ...initialValues,
                defaultCommission: initialValues.defaultCommission ?? '',
                syncFrequency: initialValues.syncFrequency || defaultValues.syncFrequency
            })
            setHasSubmitted(false)
        }
    }, [isOpen, initialValues])

    const title = useMemo(() => (mode === 'edit' ? 'Actualizar red' : 'Crear nueva red'), [mode])
    const submitLabel = useMemo(() => (mode === 'edit' ? 'Guardar cambios' : 'Crear red'), [mode])

    if (!isOpen) {
        return null
    }

    const handleChange = (field) => (event) => {
        const { value } = event.target
        setFormValues((previous) => ({
            ...previous,
            [field]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setHasSubmitted(true)

        if (!formValues.name.trim()) {
            return
        }

        onSubmit?.({
            ...formValues,
            defaultCommission: formValues.defaultCommission === '' ? null : Number(formValues.defaultCommission)
        })
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <header className={styles.header}>
                    <div>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.subtitle}>
                            Define la información clave para compartir tu inventario con aliados y mantén los datos de contacto actualizados.
                        </p>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        <X size={20} weight="bold" />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="network-name" className={styles.label}>Nombre de la red *</label>
                        <input
                            id="network-name"
                            type="text"
                            value={formValues.name}
                            onChange={handleChange('name')}
                            className={`${styles.input} ${hasSubmitted && !formValues.name.trim() ? styles.inputError : ''}`}
                            placeholder="Ej. Red 2clics"
                            autoFocus
                        />
                        {hasSubmitted && !formValues.name.trim() && (
                            <span className={styles.errorMessage}>Ingresa un nombre para la red.</span>
                        )}
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="network-description" className={styles.label}>Descripción</label>
                        <textarea
                            id="network-description"
                            rows={3}
                            value={formValues.description}
                            onChange={handleChange('description')}
                            className={styles.textarea}
                            placeholder="Describe el alcance de la red, los tipos de propiedades o las condiciones de participación."
                        />
                    </div>

                    <div className={styles.rowFields}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-color" className={styles.label}>Color identificador</label>
                            <div className={styles.colorControl}>
                                <input
                                    id="network-color"
                                    type="color"
                                    value={formValues.tagColor}
                                    onChange={handleChange('tagColor')}
                                />
                                <span>{formValues.tagColor?.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-status" className={styles.label}>Estado</label>
                            <select
                                id="network-status"
                                value={formValues.connectionStatus}
                                onChange={handleChange('connectionStatus')}
                                className={styles.select}
                            >
                                <option value="connected">Activa</option>
                                <option value="pending">Pendiente</option>
                                <option value="draft">Borrador</option>
                            </select>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-commission" className={styles.label}>Comisión estándar (%)</label>
                            <input
                                id="network-commission"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={formValues.defaultCommission ?? ''}
                                onChange={handleChange('defaultCommission')}
                                className={styles.input}
                                placeholder="Ej. 30"
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="network-policy" className={styles.label}>Política de compartición</label>
                        <textarea
                            id="network-policy"
                            rows={3}
                            value={formValues.sharePolicy}
                            onChange={handleChange('sharePolicy')}
                            className={styles.textarea}
                            placeholder="Detalla requisitos o acuerdos de comisión."
                        />
                    </div>

                    <div className={styles.rowFields}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-contact-name" className={styles.label}>Contacto principal</label>
                            <input
                                id="network-contact-name"
                                type="text"
                                value={formValues.contactName}
                                onChange={handleChange('contactName')}
                                className={styles.input}
                                placeholder="Ej. Ana Torres"
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-contact-email" className={styles.label}>Correo</label>
                            <input
                                id="network-contact-email"
                                type="email"
                                value={formValues.contactEmail}
                                onChange={handleChange('contactEmail')}
                                className={styles.input}
                                placeholder="contacto@red.com"
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-contact-phone" className={styles.label}>Teléfono</label>
                            <input
                                id="network-contact-phone"
                                type="tel"
                                value={formValues.contactPhone}
                                onChange={handleChange('contactPhone')}
                                className={styles.input}
                                placeholder="+57 300 000 0000"
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="network-sync" className={styles.label}>Frecuencia de sincronización</label>
                        <select
                            id="network-sync"
                            value={formValues.syncFrequency}
                            onChange={handleChange('syncFrequency')}
                            className={styles.select}
                        >
                            <option value="Manual">Manual</option>
                            <option value="Cada 4 horas">Cada 4 horas</option>
                            <option value="Cada 12 horas">Cada 12 horas</option>
                            <option value="Diaria">Diaria</option>
                            <option value="Semanal">Semanal</option>
                        </select>
                    </div>

                    <footer className={styles.footer}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <Button type="submit" variant="primary">
                            {submitLabel}
                        </Button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default NetworkFormModal