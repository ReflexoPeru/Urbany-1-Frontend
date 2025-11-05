import { useEffect, useMemo, useState } from 'react'
import { CaretRight, HeartStraight, Info, Trash } from 'phosphor-react'
import Pagination from '../../../components/common/Pagination'
import styles from './NetworksTable.module.css'

const ITEMS_PER_PAGE = 8

const formatPrice = (value, currency = 'COP') => {
    if (value === undefined || value === null) {
        return '--'
    }

    const normalizedCurrency = currency === 'COP' ? 'COP' : currency

    return new Intl.NumberFormat('es-CO', {
        style: normalizedCurrency === 'COP' ? 'currency' : 'decimal',
        currency: normalizedCurrency === 'COP' ? 'COP' : undefined,
        maximumFractionDigits: normalizedCurrency === 'COP' ? 0 : 2
    }).format(value)
}

const getLogoFallback = (name = '') => {
    return name
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
}

const NetworksTable = ({
    data = [],
    selectedIds = [],
    onSelectionChange,
    onViewProperty,
    onOpenDetails,
    onToggleFavorite,
    onRemoveProperty
}) => {
    const rows = useMemo(
        () => data.map((item, index) => ({
            ...item,
            __rowId: item?.id ?? `network-row-${index}`
        })),
        [data]
    )

    const selectableIds = useMemo(() => rows.map((row) => row.__rowId), [rows])
    const allSelected = selectableIds.length > 0 && selectedIds.length === selectableIds.length

    const [currentPage, setCurrentPage] = useState(1)

    const totalItems = rows.length
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return rows.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [rows, currentPage])

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        setCurrentPage(1)
    }, [data])

    const handleSelectAll = (checked) => {
        if (!onSelectionChange) {
            return
        }

        if (checked) {
            onSelectionChange(selectableIds)
        } else {
            onSelectionChange([])
        }
    }

    const handleSelectRow = (rowId, checked) => {
        if (!onSelectionChange) {
            return
        }

        if (checked) {
            if (selectedIds.includes(rowId)) {
                return
            }
            onSelectionChange([...selectedIds, rowId])
            return
        }

        onSelectionChange(selectedIds.filter((item) => item !== rowId))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tableContainer}>
                <div className={styles.table} role="table">
                    <div className={styles.headerRow} role="row">
                        <div className={`${styles.headerCell} ${styles.checkboxCell}`} role="columnheader">
                            <input
                                type="checkbox"
                                className={styles.checkboxControl}
                                checked={allSelected}
                                onChange={(event) => handleSelectAll(event.target.checked)}
                                aria-label="Seleccionar todas las propiedades"
                            />
                        </div>
                        <div className={styles.headerCell} role="columnheader">Propiedad</div>
                        <div className={styles.headerCell} role="columnheader">Comisión</div>
                        <div className={styles.headerCell} role="columnheader">Tipo</div>
                        <div className={styles.headerCell} role="columnheader">Precio</div>
                        <div className={`${styles.headerCell} ${styles.actionsHeader}`} role="columnheader">Inmobiliaria</div>
                    </div>

                    <div className={styles.body} role="rowgroup">
                        {paginatedRows.length === 0 ? (
                            <div className={styles.emptyRow} role="row">
                                No se encontraron propiedades en esta red.
                            </div>
                        ) : (
                            paginatedRows.map((property) => {
                                const rowId = property.__rowId
                                const isSelected = selectedIds.includes(rowId)
                                const priceLabel = formatPrice(property.price, property.currency)

                                return (
                                    <div
                                        key={rowId}
                                        className={`${styles.bodyRow} ${isSelected ? styles.selectedRow : ''}`}
                                        role="row"
                                    >
                                        <div className={`${styles.cell} ${styles.checkboxCell}`} role="cell">
                                            <input
                                                type="checkbox"
                                                className={styles.checkboxControl}
                                                checked={isSelected}
                                                onChange={(event) => handleSelectRow(rowId, event.target.checked)}
                                                aria-label={`Seleccionar ${property.address}`}
                                            />
                                        </div>

                                        <div className={`${styles.cell} ${styles.propertyCell}`} role="cell">
                                            <div className={styles.photoWrapper}>
                                                {property.image ? (
                                                    <img src={property.image} alt={property.address} className={styles.photo} />
                                                ) : (
                                                    <div className={styles.photoFallback}>{getLogoFallback(property.address)}</div>
                                                )}
                                                <button
                                                    type="button"
                                                    className={`${styles.favoriteButton} ${property.isFavorite ? styles.favoriteActive : ''}`}
                                                    onClick={() => onToggleFavorite?.(property)}
                                                    aria-label={property.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorita'}
                                                >
                                                    <HeartStraight size={16} weight={property.isFavorite ? 'fill' : 'bold'} />
                                                </button>
                                            </div>

                                            <div className={styles.propertyInfo}>
                                                <span className={styles.propertyAddress}>{property.address}</span>
                                                <span className={styles.propertyMeta}>
                                                    {property.city} · {property.neighborhood}
                                                </span>
                                                <div className={styles.tagsRow}>
                                                    {property.code && <span className={styles.codeBadge}>{property.code}</span>}
                                                    {property.coverage && <span className={styles.coverageBadge}>{property.coverage}</span>}
                                                    {property.isMine && <span className={styles.mineBadge}>Mi inventario</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.cell} ${styles.commissionCell}`} role="cell">
                                            <span className={styles.commissionBadge}>{property.commission}%</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.typeCell}`} role="cell">
                                            <span className={styles.typeMain}>{property.propertyType}</span>
                                            <span className={styles.typeMeta}>
                                                {property.bedrooms ? `${property.bedrooms} dorm.` : 'Sin dormitorios'} · {property.bathrooms ?? 0} baños
                                            </span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.priceCell}`} role="cell">
                                            <span className={`${styles.operationBadge} ${styles[`operation-${property.operation?.toLowerCase()}`]}`}>
                                                {property.operation}
                                            </span>
                                            <span className={styles.priceValue}>{priceLabel}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.realEstateCell}`} role="cell">
                                            <div className={styles.realEstateInfo}>
                                                <div className={styles.realEstateLogoWrapper}>
                                                    {property.realEstate?.logo ? (
                                                        <img src={property.realEstate.logo} alt={property.realEstate.name} className={styles.realEstateLogo} />
                                                    ) : (
                                                        <div className={styles.realEstateFallback}>{getLogoFallback(property.realEstate?.name)}</div>
                                                    )}
                                                </div>
                                                <div className={styles.realEstateText}>
                                                    <span className={styles.realEstateName}>{property.realEstate?.name ?? 'Sin inmobiliaria'}</span>
                                                    {property.contact?.name && (
                                                        <span className={styles.contactName}>{property.contact.name}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={styles.actionButtons}>
                                                <button
                                                    type="button"
                                                    className={styles.rowButton}
                                                    onClick={() => onViewProperty?.(property)}
                                                    aria-label="Ver propiedad"
                                                >
                                                    <CaretRight size={18} weight="bold" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={styles.rowButton}
                                                    onClick={() => onOpenDetails?.(property)}
                                                    aria-label="Ver detalles"
                                                >
                                                    <Info size={18} weight="bold" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${styles.rowButton} ${styles.rowButtonDanger}`}
                                                    onClick={() => onRemoveProperty?.(property)}
                                                    aria-label="Eliminar de la red"
                                                >
                                                    <Trash size={18} weight="bold" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                    showInfo
                    showPageNumbers
                    maxVisiblePages={5}
                />
            </div>
        </div>
    )
}

export default NetworksTable













