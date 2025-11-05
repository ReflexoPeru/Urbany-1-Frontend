import { useEffect, useState } from 'react'
import { X } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './NetworkFormModal.module.css'

const defaultValues = {
    name: '',
    description: '',
    tagColor: '#1d4ed8',
    connectionStatus: 'connected'
}

const NetworkFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [formValues, setFormValues] = useState(defaultValues)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setFormValues(defaultValues)
            setHasSubmitted(false)
        }
    }, [isOpen])

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

        onSubmit?.(formValues)
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <header className={styles.header}>
                    <div>
                        <h2 className={styles.title}>Crear nueva red</h2>
                        <p className={styles.subtitle}>Comparte tu inventario con aliados estratégicos y controla la comisión.</p>
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
                            placeholder="Cuéntales a tus aliados qué tipo de propiedades compartirás."
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
                                <span>{formValues.tagColor.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="network-status" className={styles.label}>Estado inicial</label>
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
                    </div>

                    <footer className={styles.footer}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <Button type="submit" variant="primary">
                            Crear red
                        </Button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default NetworkFormModal













