import React, { useMemo, useRef, useEffect, useState } from 'react'
import { EnvelopeSimple, Phone, Pencil, Trash } from 'phosphor-react'
import styles from './ContactsDataTable.module.css'
import Pagination from '../../../components/common/Pagination'

const normalizeContacts = (contacts) =>
    contacts.map((item, index) => ({
        ...item,
        __rowId: item?.id ?? `contact-${index}`
    }))

const ITEMS_PER_PAGE = 10

const getInitials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()

const formatDate = (value) => {
    if (!value) return 'Sin fecha'
    const date = new Date(value)
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

const ContactsDataTable = ({
    data = [],
    selectedIds = [],
    onSelectionChange,
    onRowClick,
    onEditContact,
    onDeleteContact
}) => {
    const rows = useMemo(() => normalizeContacts(data), [data])
    const [currentPage, setCurrentPage] = useState(1)
    const selectableIds = useMemo(() => rows.map((row) => row.__rowId), [rows])
    const allSelected = selectableIds.length > 0 && selectedIds.length === selectableIds.length
    const headerCheckboxRef = useRef(null)
    const totalItems = rows.length
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return rows.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [rows, currentPage])

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate =
                selectedIds.length > 0 && selectedIds.length < selectableIds.length
        }
    }, [selectedIds, selectableIds])

    useEffect(() => {
        setCurrentPage(1)
    }, [data])

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    const handleSelectRow = (rowId, checked) => {
        if (!onSelectionChange) return
        if (checked) {
            if (selectedIds.includes(rowId)) {
                return
            }
            onSelectionChange([...selectedIds, rowId])
            return
        }
        onSelectionChange(selectedIds.filter((item) => item !== rowId))
    }

    const handleSelectAll = (checked) => {
        if (!onSelectionChange) return
        if (checked) {
            onSelectionChange(selectableIds)
            return
        }
        onSelectionChange([])
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
                                aria-label="Seleccionar todos los contactos"
                            />
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Contacto
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Correo
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Teléfono
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Último contacto
                        </div>
                        <div className={`${styles.headerCell} ${styles.headerCellActions}`} role="columnheader">
                            Acciones
                        </div>
                    </div>

                    <div className={styles.body} role="rowgroup">
                        {rows.length === 0 ? (
                            <div className={styles.emptyRow} role="row">
                                No se encontraron contactos.
                            </div>
                        ) : (
                            paginatedRows.map((contact) => {
                                const rowId = contact.__rowId
                                const isSelected = selectedIds.includes(rowId)

                                return (
                                    <div
                                        key={rowId}
                                        className={`${styles.bodyRow} ${isSelected ? styles.selectedRow : ''}`}
                                        role="row"
                                        onClick={() => onRowClick?.(contact)}
                                    >
                                        <div className={`${styles.cell} ${styles.checkboxCell}`} role="cell">
                                            <input
                                                type="checkbox"
                                                className={styles.checkboxControl}
                                                checked={isSelected}
                                                onChange={(event) => handleSelectRow(rowId, event.target.checked)}
                                                onClick={(event) => event.stopPropagation()}
                                                aria-label={`Seleccionar ${contact.name}`}
                                            />
                                        </div>

                                        <div className={`${styles.cell} ${styles.contactCell}`} role="cell">
                                            <div className={styles.avatarWrapper}>
                                                {contact.avatar ? (
                                                    <img src={contact.avatar} alt={contact.name} className={styles.avatar} />
                                                ) : (
                                                    <div className={styles.avatarFallback}>{getInitials(contact.name)}</div>
                                                )}
                                            </div>
                                            <div className={styles.contactInfo}>
                                                <span className={styles.contactName}>{contact.name}</span>
                                                <span className={styles.contactMeta}>
                                                    {contact.company && <span>{contact.company}</span>}
                                                    {contact.type && <span className={styles.badge}>{contact.type}</span>}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`${styles.cell} ${styles.emailCell}`} role="cell">
                                            <EnvelopeSimple size={16} />
                                            <span>{contact.email}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.phoneCell}`} role="cell">
                                            <Phone size={16} />
                                            <span>{contact.phone}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.dateCell}`} role="cell">
                                            <span>{formatDate(contact.lastContact)}</span>
                                        </div>

                                        <div className={`${styles.cell} ${styles.actionsCell}`} role="cell">
                                            <button
                                                type="button"
                                                className={styles.actionButton}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    onEditContact?.(contact)
                                                }}
                                                aria-label={`Editar ${contact.name}`}
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.actionButton} ${styles.danger}`}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    onDeleteContact?.(contact)
                                                }}
                                                aria-label={`Eliminar ${contact.name}`}
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

export default ContactsDataTable

