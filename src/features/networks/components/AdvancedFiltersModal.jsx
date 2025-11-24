import { useEffect, useState } from 'react'
import { SlidersHorizontal, X } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './AdvancedFiltersModal.module.css'

const AdvancedFiltersModal = ({
    isOpen,
    onClose,
    onApply,
    coverages = [],
    initialCoverage,
    initialQuality,
    includeMineOnly,
    showFavoritesOnly
}) => {
    const [coverage, setCoverage] = useState(initialCoverage ?? '')
    const [minQuality, setMinQuality] = useState(initialQuality ?? '')
    const [onlyMine, setOnlyMine] = useState(includeMineOnly ?? false)
    const [onlyFavorites, setOnlyFavorites] = useState(showFavoritesOnly ?? false)

    useEffect(() => {
        if (isOpen) {
            setCoverage(initialCoverage ?? '')
            setMinQuality(initialQuality ?? '')
            setOnlyMine(includeMineOnly ?? false)
            setOnlyFavorites(showFavoritesOnly ?? false)
        }
    }, [isOpen, initialCoverage, initialQuality, includeMineOnly, showFavoritesOnly])

    if (!isOpen) {
        return null
    }

    const handleApply = (event) => {
        event.preventDefault()
        onApply?.({
            coverage: coverage || null,
            quality: minQuality ? Number.parseInt(minQuality, 10) : null,
            includeMineOnly: onlyMine,
            showFavoritesOnly: onlyFavorites
        })
    }

    const handleClear = () => {
        setCoverage('')
        setMinQuality('')
        setOnlyMine(false)
        setOnlyFavorites(false)
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <SlidersHorizontal size={24} weight="bold" />
                        <div>
                            <h2 className={styles.title}>Filtros avanzados</h2>
                            <p className={styles.subtitle}>Refina la colaboración con tus redes según la cobertura y calidad.</p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        <X size={18} weight="bold" />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleApply}>
                    <div className={styles.fieldset}>
                        <label className={styles.label} htmlFor="advanced-coverage">Cobertura preferida</label>
                        <select
                            id="advanced-coverage"
                            value={coverage}
                            onChange={(event) => setCoverage(event.target.value)}
                            className={styles.select}
                        >
                            <option value="">Todas las coberturas</option>
                            {coverages.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.fieldset}>
                        <label className={styles.label} htmlFor="advanced-quality">Calidad mínima de publicación</label>
                        <div className={styles.sliderRow}>
                            <input
                                id="advanced-quality"
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={minQuality || 0}
                                onChange={(event) => setMinQuality(event.target.value)}
                            />
                            <span className={styles.sliderValue}>{minQuality || 0}%</span>
                        </div>
                    </div>

                    <div className={styles.toggleGroup}>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={onlyMine} onChange={(event) => setOnlyMine(event.target.checked)} />
                            <span>Mostrar solo mis propiedades</span>
                        </label>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={onlyFavorites} onChange={(event) => setOnlyFavorites(event.target.checked)} />
                            <span>Solo favoritas</span>
                        </label>
                    </div>

                    <footer className={styles.footer}>
                        <button type="button" className={styles.clearButton} onClick={handleClear}>
                            Limpiar
                        </button>
                        <div className={styles.footerActions}>
                            <button type="button" className={styles.cancelButton} onClick={onClose}>
                                Cancelar
                            </button>
                            <Button type="submit" variant="primary" size="medium">
                                Aplicar filtros
                            </Button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default AdvancedFiltersModal













