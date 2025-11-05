import { MapTrifold, X } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './MapPreviewModal.module.css'

const MapPreviewModal = ({ isOpen, onClose, onOpenMap, propertiesCount }) => {
    if (!isOpen) {
        return null
    }

    const handleOpenMap = () => {
        onOpenMap?.()
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.headerInfo}>
                        <MapTrifold size={24} weight="bold" />
                        <div>
                            <h2 className={styles.title}>Vista en mapa</h2>
                            <p className={styles.subtitle}>Visualiza las {propertiesCount} propiedades de la red en el mapa interactivo.</p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        <X size={18} weight="bold" />
                    </button>
                </header>

                <div className={styles.preview}>
                    <div className={styles.placeholder}>Mapa disponible en la sección principal</div>
                </div>

                <footer className={styles.footer}>
                    <button type="button" className={styles.secondaryButton} onClick={onClose}>
                        Cerrar
                    </button>
                    <Button variant="primary" size="medium" icon="search" onClick={handleOpenMap}>
                        Abrir mapa completo
                    </Button>
                </footer>
            </div>
        </div>
    )
}

export default MapPreviewModal













