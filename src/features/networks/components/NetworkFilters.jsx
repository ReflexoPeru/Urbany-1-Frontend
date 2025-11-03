import { Faders, HeartStraight, MagnifyingGlass, MapTrifold, Trash } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import NetworkFilterDropdown from './NetworkFilterDropdown'
import styles from './NetworkFilters.module.css'

const priceRangeOptions = [
    { value: '0-3000000', label: 'Hasta 3M COP' },
    { value: '3000000-6000000', label: '3M - 6M COP' },
    { value: '6000000-10000000', label: '6M - 10M COP' },
    { value: '10000000+', label: 'Más de 10M COP' },
    { value: '500000000+', label: 'Más de 500M COP' }
]

const NetworkFilters = ({
    searchTerm,
    onSearchChange,
    includeMineOnly,
    onToggleIncludeMine,
    showFavoritesOnly,
    onToggleFavoritesOnly,
    filters,
    onFilterChange,
    onClearFilters,
    filterOptions,
    onOpenAdvancedFilters,
    onOpenMap,
    onBulkRemove,
    selectionStats,
    sortOption,
    onSortChange
}) => {
    const selectedCount = selectionStats?.selectedCount ?? 0

    return (
        <div className={styles.wrapper}>
            <div className={styles.controlBar}>
                <div className={styles.searchGroup}>
                    <div className={styles.searchBox}>
                        <MagnifyingGlass size={18} weight="bold" className={styles.searchIcon} />
                        <input
                            type="search"
                            className={styles.searchInput}
                            placeholder="Dirección o código de la propiedad..."
                            value={searchTerm}
                            onChange={(event) => onSearchChange?.(event.target.value)}
                        />
                    </div>
                    <label className={styles.checkboxControl}>
                        <input
                            type="checkbox"
                            checked={includeMineOnly}
                            onChange={onToggleIncludeMine}
                        />
                        <span>Incluir mis propiedades</span>
                    </label>
                </div>

                <div className={styles.actionsGroup}>
                    <button type="button" className={styles.mapButton} onClick={onOpenMap}>
                        <MapTrifold size={18} weight="bold" />
                        Ver en mapa
                    </button>

                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={onOpenAdvancedFilters}
                        aria-label="Filtros avanzados"
                    >
                        <Faders size={18} weight="bold" />
                    </button>

                    <button
                        type="button"
                        className={`${styles.iconButton} ${selectedCount === 0 ? styles.iconButtonDisabled : styles.iconButtonDanger}`}
                        onClick={onBulkRemove}
                        disabled={selectedCount === 0}
                        aria-label="Eliminar propiedades seleccionadas"
                    >
                        <Trash size={18} weight="bold" />
                    </button>

                    <button
                        type="button"
                        className={`${styles.iconButton} ${showFavoritesOnly ? styles.iconButtonActive : ''}`}
                        onClick={onToggleFavoritesOnly}
                        aria-label="Mostrar solo favoritas"
                    >
                        <HeartStraight size={18} weight="bold" />
                    </button>
                </div>
            </div>

            <div className={styles.filtersRow}>
                <NetworkFilterDropdown
                    label="Tipo de operación"
                    value={filters.operation}
                    options={filterOptions.operations}
                    onChange={(value) => onFilterChange?.('operation', value)}
                />
                <NetworkFilterDropdown
                    label="Tipo de propiedad"
                    value={filters.propertyType}
                    options={filterOptions.propertyTypes}
                    onChange={(value) => onFilterChange?.('propertyType', value)}
                />
                <NetworkFilterDropdown
                    label="Precio"
                    value={filters.priceRange}
                    options={priceRangeOptions}
                    onChange={(value) => onFilterChange?.('priceRange', value)}
                />
                <NetworkFilterDropdown
                    label="Ubicación"
                    value={filters.location}
                    options={filterOptions.locations}
                    onChange={(value) => onFilterChange?.('location', value)}
                />
                <NetworkFilterDropdown
                    label="Dormitorios"
                    value={filters.bedrooms}
                    options={filterOptions.bedrooms}
                    onChange={(value) => onFilterChange?.('bedrooms', value)}
                />
                <NetworkFilterDropdown
                    label="Comisión"
                    value={filters.commission}
                    options={filterOptions.commissions}
                    onChange={(value) => onFilterChange?.('commission', value)}
                />
                <NetworkFilterDropdown
                    label="Inmobiliaria"
                    value={filters.realEstate}
                    options={filterOptions.realEstates}
                    onChange={(value) => onFilterChange?.('realEstate', value)}
                />
                <NetworkFilterDropdown
                    label="Ordenar"
                    value={sortOption}
                    options={[
                        { value: 'recent', label: 'Más recientes' },
                        { value: 'higherPrice', label: 'Precio más alto' },
                        { value: 'lowerPrice', label: 'Precio más bajo' }
                    ]}
                    onChange={onSortChange}
                />
            </div>

            <div className={styles.footerBar}>
                <div className={styles.summary}>
                    <span>
                        {selectionStats.total} resultados · {selectionStats.mineCount} míos · {selectionStats.favoritesCount} favoritos
                    </span>
                    {selectedCount > 0 && (
                        <span className={styles.selectionLabel}>
                            {selectedCount} seleccionados
                        </span>
                    )}
                </div>

                <div className={styles.footerActions}>
                    <button type="button" className={styles.clearButton} onClick={onClearFilters}>
                        Limpiar filtros
                    </button>
                    <Button variant="secondary" size="small" className={styles.syncButton} onClick={onOpenAdvancedFilters}>
                        Configurar filtros
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NetworkFilters


