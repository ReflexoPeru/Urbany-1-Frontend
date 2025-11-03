import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Pencil, Trash, House, Link as LinkIcon } from 'phosphor-react';
import styles from './PropertiesDataTable.module.css';
import Pagination from '../../../components/common/Pagination';

const formatPrice = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return '--';
    }

    return new Intl.NumberFormat('es-PE', {
        minimumFractionDigits: 0,
    }).format(value);
};

const normalizePortals = (portals) => {
    if (Array.isArray(portals)) {
        return portals.length ? portals : ['Sin difundir'];
    }

    if (typeof portals === 'string' && portals.trim()) {
        return [portals.trim()];
    }

    return ['Sin difundir'];
};

const PropertyImage = ({ image, address }) => {
    const [hasError, setHasError] = useState(false);
    const initials = useMemo(() => {
        if (!address) {
            return 'PR';
        }

        return address
            .split(' ')
            .filter(Boolean)
            .map((word) => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }, [address]);

    if (!image || hasError) {
        return <div className={styles.photoFallback}>{initials}</div>;
    }

    return (
        <img
            src={image}
            alt={address ?? 'Propiedad'}
            className={styles.photo}
            onError={() => setHasError(true)}
        />
    );
};

const QualityIndicator = ({ value }) => {
    const percentage = Math.max(0, Math.min(100, Number(value) || 0));

    return (
        <div className={styles.qualityWrapper}>
            <div className={styles.qualityBar}>
                <div className={styles.qualityFill} style={{ width: `${percentage}%` }} />
            </div>
            <span className={styles.qualityValue}>{percentage}%</span>
        </div>
    );
};

const ITEMS_PER_PAGE = 10;

const PropertiesDataTable = ({ data = [], onRowClick, onEdit, onDelete, onView }) => {
    const rows = useMemo(
        () =>
            data.map((item, index) => ({
                ...item,
                __rowId: item?.id ?? `row-${index}`,
            })),
        [data]
    );

    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const selectableIds = useMemo(() => rows.map((item) => item.__rowId), [rows]);
    const isAllSelected = selectableIds.length > 0 && selectedIds.length === selectableIds.length;
    const showActions = Boolean(onView || onEdit || onDelete);
    const totalItems = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [rows, currentPage]);

    useEffect(() => {
        setSelectedIds((previous) => previous.filter((id) => selectableIds.includes(id)));
    }, [selectableIds]);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(selectableIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (rowId, checked) => {
        setSelectedIds((previous) => {
            if (checked) {
                if (previous.includes(rowId)) {
                    return previous;
                }

                return [...previous, rowId];
            }

            return previous.filter((item) => item !== rowId);
        });
    };

    const handleRowClick = (event, property) => {
        if (event.target.closest('button') || event.target.closest('input')) {
            return;
        }

        onRowClick?.(property);
    };

    const gridTemplate = showActions
        ? '56px 110px 2fr 1.1fr 1.1fr 1fr 1.4fr 140px'
        : '56px 110px 2fr 1.1fr 1.1fr 1fr 1.4fr';

    return (
        <div className={styles.wrapper}>
            <div className={styles.tableContainer}>
                <div
                    className={styles.table}
                    style={{ '--grid-template-columns': gridTemplate }}
                    data-has-actions={showActions}
                    role="table"
                >
                    <div className={styles.headerRow} role="row">
                        <div
                            className={`${styles.headerCell} ${styles.checkboxCell} ${styles.headerCellCheckbox}`}
                            role="columnheader"
                        >
                            <input
                                type="checkbox"
                                className={styles.checkboxControl}
                                checked={isAllSelected}
                                onChange={(event) => handleSelectAll(event.target.checked)}
                                aria-label="Seleccionar todas las propiedades"
                            />
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Foto
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Dirección
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Calidad
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Tipo
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Precio
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Portales
                        </div>
                        {showActions && (
                            <div className={`${styles.headerCell} ${styles.headerCellActions}`} role="columnheader">
                                Acciones
                            </div>
                        )}
                    </div>

                    <div className={styles.body} role="rowgroup">
                        {rows.length === 0 ? (
                            <div className={styles.emptyRow} role="row">
                                No se encontraron propiedades.
                            </div>
                        ) : (
                            paginatedRows.map((property) => {
                                const rowId = property.__rowId;
                                const isSelected = selectedIds.includes(rowId);
                                const portals = normalizePortals(property.portals);

                                return (
                                    <div
                                        key={rowId}
                                        className={`${styles.bodyRow} ${isSelected ? styles.selectedRow : ''}`}
                                        role="row"
                                        onClick={(event) => handleRowClick(event, property)}
                                    >
                                        <div className={`${styles.cell} ${styles.checkboxCell}`} role="cell">
                                            <input
                                                type="checkbox"
                                                className={styles.checkboxControl}
                                                checked={isSelected}
                                                onChange={(event) => handleSelectRow(rowId, event.target.checked)}
                                                onClick={(event) => event.stopPropagation()}
                                                aria-label={`Seleccionar ${property.address ?? 'propiedad'}`}
                                            />
                                        </div>

                                        <div className={styles.cell} role="cell">
                                            <div className={styles.photoCellContent}>
                                                <PropertyImage image={property.image} address={property.address} />
                                            </div>
                                        </div>

                                        <div className={styles.cell} role="cell">
                                            <span className={styles.addressMain}>
                                                {property.address ?? 'Dirección no disponible'}
                                            </span>
                                            <span className={styles.addressMeta}>
                                                {property.code && <span className={styles.codeTag}>{property.code}</span>}
                                                {property.city && <span>{property.city}</span>}
                                            </span>
                                        </div>

                                        <div className={styles.cell} role="cell">
                                            <QualityIndicator value={property.quality} />
                                        </div>

                                        <div className={styles.cell} role="cell">
                                            <span className={styles.typeMain}>{property.type ?? 'Sin tipo'}</span>
                                            {property.category && <span className={styles.typeSecondary}>{property.category}</span>}
                                        </div>

                                        <div className={styles.cell} role="cell">
                                            <span className={styles.priceBadge}>
                                                {property.currency ?? '$'} {formatPrice(property.price)}
                                            </span>
                                        </div>

                                        <div className={styles.cell} role="cell">
                                            <div className={styles.portalsList}>
                                                {portals.map((portal, index) => (
                                                    <span key={`${rowId}-portal-${index}`} className={styles.portalTag}>
                                                        <House size={14} />
                                                        <span>{portal}</span>
                                                        <LinkIcon size={14} />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {showActions && (
                                            <div className={`${styles.cell} ${styles.actionsCell}`} role="cell">
                                                {onView && (
                                                    <button
                                                        type="button"
                                                        className={styles.actionButton}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            onView(property);
                                                        }}
                                                        aria-label="Ver propiedad"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        type="button"
                                                        className={styles.actionButton}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            onEdit(property);
                                                        }}
                                                        aria-label="Editar propiedad"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        type="button"
                                                        className={`${styles.actionButton} ${styles.danger}`}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            onDelete(property);
                                                        }}
                                                        aria-label="Eliminar propiedad"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
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
    );
};

export default PropertiesDataTable;
