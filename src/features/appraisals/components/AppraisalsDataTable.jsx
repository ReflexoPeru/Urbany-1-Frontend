import React, { useMemo, useRef, useEffect } from 'react'
import { EnvelopeSimple, Phone, MapPin, Eye, Pencil, Trash } from 'phosphor-react'
import styles from './AppraisalsDataTable.module.css'

const normalizeRows = (data) =>
    data.map((item, index) => ({
        ...item,
        __rowId: item?.id ?? `appraisal-${index}`
    }))

const formatDate = (value) => {
    if (!value) return 'Sin fecha'
    const date = new Date(value)
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

const statusLabels = {
    pending: 'Nueva consulta',
    scheduled: 'Visita programada',
    in_progress: 'En tasación',
    completed: 'Completada'
}

const AppraisalsDataTable = ({
    data = [],
    selectedIds = [],
    onSelectionChange,
    onView,
    onEdit,
    onDelete
}) => {
    const rows = useMemo(() => normalizeRows(data), [data])
    const selectableIds = useMemo(() => rows.map((row) => row.__rowId), [rows])
    const headerCheckboxRef = useRef(null)
    const allSelected = selectableIds.length > 0 && selectedIds.length === selectableIds.length

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate =
                selectedIds.length > 0 && selectedIds.length < selectableIds.length
        }
    }, [selectedIds, selectableIds])

    const handleSelectAll = (checked) => {
        if (!onSelectionChange) return
        onSelectionChange(checked ? selectableIds : [])
    }

    const handleSelectRow = (rowId, checked) => {
        if (!onSelectionChange) return
        if (checked) {
            if (selectedIds.includes(rowId)) return
            onSelectionChange([...selectedIds, rowId])
            return
        }
        onSelectionChange(selectedIds.filter((id) => id !== rowId))
    }

    const getStatusClass = (status) => {
        if (!status) return ''
        return styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`] || ''
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tableContainer}>
                <div className={styles.table} role="table">
                    <div className={styles.headerRow} role="row">
                        <div className={`${styles.headerCell} ${styles.headerCellCheckbox}`} role="columnheader">
                            <input
                                ref={headerCheckboxRef}
                                type="checkbox"
                                className={styles.checkboxControl}
                                checked={allSelected}
                                onChange={(event) => handleSelectAll(event.target.checked)}
                                aria-label="Seleccionar todas las tasaciones"
                            />
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Cliente
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Correo
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Teléfono
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Propiedad
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Estado
                        </div>
                        <div className={`${styles.headerCell} ${styles.headerCellActions}`} role="columnheader">
                            Acciones
                        </div>
                    </div>

                    <div className={styles.body} role="rowgroup">
                        {rows.length === 0 ? (
                            <div className={styles.emptyRow} role="row">
                                No se encontraron tasaciones.
                            </div>
                        ) : (
                            rows.map((row) => {
                                const isSelected = selectedIds.includes(row.__rowId)

                                return (
                                    <div
                                        key={row.__rowId}
                                        className={`${styles.bodyRow} ${isSelected ? styles.selectedRow : ''}`}
                                        role="row"
                                        onClick={() => onView?.(row)}
                                    >
                                        <div className={`${styles.cell} ${styles.checkboxCell}`} role="cell">
                                            <input
                                                type="checkbox"
                                                className={styles.checkboxControl}
                                                checked={isSelected}
                                                onChange={(event) => handleSelectRow(row.__rowId, event.target.checked)}
                                                onClick={(event) => event.stopPropagation()}
                                                aria-label={`Seleccionar tasación de ${row.clientName}`}
                                            />
                                        </div>

                                        <div className={`${styles.cell} ${styles.clientCell}`} role="cell">
                                            <div className={styles.clientInfo}>
                                                <span className={styles.clientName}>{row.clientName}</span>
                                                <span className={styles.clientMeta}>Asesor: {row.agent}</span>
                                            </div>
                                        </div>

                                        <div className={`${styles.cell} ${styles.emailCell}`} role="cell">
                                            <EnvelopeSimple size={16} />
                                            <span className={styles.textValue}>{row.clientEmail}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.phoneCell}`} role="cell">
                                            <Phone size={16} />
                                            <span className={styles.textValue}>{row.clientPhone}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.propertyCell}`} role="cell">
                                            <MapPin size={16} />
                                            <div className={styles.propertyInfo}>
                                                <span className={styles.propertyAddress}>{row.propertyAddress}</span>
                                                <span className={styles.propertyMeta}>
                                                    <span>{row.propertyType}</span>
                                                    {row.valueRange && <span className={styles.valueRange}>{row.valueRange}</span>}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`${styles.cell} ${styles.statusCell}`} role="cell">
                                            <span className={`${styles.statusBadge} ${getStatusClass(row.status)}`}>
                                                {statusLabels[row.status] || row.status}
                                            </span>
                                            <span className={styles.statusHint}>Actualizado {formatDate(row.lastUpdate)}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.actionsCell}`} role="cell">
                                            <button
                                                type="button"
                                                className={styles.actionButton}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    onView?.(row)
                                                }}
                                                aria-label={`Ver tasación de ${row.clientName}`}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.actionButton}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    onEdit?.(row)
                                                }}
                                                aria-label={`Editar tasación de ${row.clientName}`}
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.actionButton} ${styles.danger}`}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    onDelete?.(row)
                                                }}
                                                aria-label={`Eliminar tasación de ${row.clientName}`}
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppraisalsDataTable

