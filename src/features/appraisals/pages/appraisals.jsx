import React, { useMemo, useState } from 'react'
import { DownloadSimple, MagnifyingGlass, ChartPie, CalendarCheck, HouseLine } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import DealModal from '../../business/components/DealModal'
import ViewDealModal from '../../business/components/ViewDealModal'
import DeleteDealModal from '../../business/components/DeleteDealModal'
import DownloadModal from '../../emprendimientos/components/DownloadModal'
import { Select } from '../../../components/common/Select'
import { useToast } from '../../../contexts/ToastContext'
import AppraisalsDataTable from '../components/AppraisalsDataTable'
import { mockAppraisals } from '../../../mock/appraisals'
import styles from './AppraisalsPage.module.css'

const statusTabs = [
    { id: 'all', label: 'Todas', icon: ChartPie },
    { id: 'pending', label: 'Nueva consulta', icon: ChartPie },
    { id: 'scheduled', label: 'Visita programada', icon: CalendarCheck },
    { id: 'in_progress', label: 'En tasación', icon: HouseLine },
    { id: 'completed', label: 'Completadas', icon: HouseLine }
]

const statusOptions = statusTabs.map((tab) => ({ value: tab.id, label: tab.label }))

const typeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'Departamento', label: 'Departamentos' },
    { value: 'Casa', label: 'Casas' },
    { value: 'Loft', label: 'Lofts' },
    { value: 'Local comercial', label: 'Locales comerciales' }
]

const mapAppraisalToDeal = (appraisal) => {
    if (!appraisal) return null

    return {
        id: appraisal.id,
        name: appraisal.clientName,
        contact: {
            phone: appraisal.clientPhone,
            email: appraisal.clientEmail
        },
        property: {
            address: appraisal.propertyAddress
        },
        agent: appraisal.agent,
        date: appraisal.visitDate || new Date().toISOString().split('T')[0],
        status: appraisal.status,
        propertyType: appraisal.propertyType,
        valueRange: appraisal.valueRange || '',
        visitDate: appraisal.visitDate || '',
        lastUpdate: appraisal.lastUpdate || ''
    }
}

const mapDealToAppraisal = (deal, base = {}) => {
    if (!deal) return base
    const visitDate = deal.date || base.visitDate || new Date().toISOString().split('T')[0]
    const propertyType = deal.propertyType || base.propertyType || 'Departamento'
    const valueRange = deal.valueRange ?? base.valueRange ?? ''
    const status = deal.status || base.status || 'pending'

    return {
        id: deal.id || base.id || `appr-${Date.now()}`,
        clientName: deal.name,
        clientEmail: deal.contact?.email || '',
        clientPhone: deal.contact?.phone || '',
        propertyAddress: deal.property?.address || '',
        propertyType,
        agent: deal.agent || base.agent || '',
        status,
        visitDate,
        lastUpdate: new Date().toISOString().split('T')[0],
        valueRange
    }
}

const Tasaciones = () => {
    const [appraisals, setAppraisals] = useState(mockAppraisals)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusTab, setStatusTab] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [selectedAppraisal, setSelectedAppraisal] = useState(null)
    const [dealModalOpen, setDealModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState('view')
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false)
    const [downloadModalOpen, setDownloadModalOpen] = useState(false)

    const { toast } = useToast()
    const currentDeal = useMemo(() => mapAppraisalToDeal(selectedAppraisal), [selectedAppraisal])

    const filteredAppraisals = useMemo(() => {
        return appraisals.filter((item) => {
            const term = searchTerm.trim().toLowerCase()
            const matchesSearch = term
                ? [item.clientName, item.clientEmail, item.clientPhone, item.propertyAddress, item.agent]
                    .filter(Boolean)
                    .some((field) => field.toLowerCase().includes(term))
                : true

            const statusFilter = selectedStatus?.value ?? statusTab
            const matchesStatus = statusFilter !== 'all'
                ? item.status === statusFilter
                : true

            const matchesType = selectedType && selectedType.value !== 'all'
                ? item.propertyType === selectedType.value
                : true

            return matchesSearch && matchesStatus && matchesType
        })
    }, [appraisals, searchTerm, selectedStatus, selectedType, statusTab])

    const handleSelectionChange = (ids) => {
        setSelectedIds(ids)
    }

    const handleAddAppraisal = () => {
        setSelectedAppraisal(null)
        setModalMode('create')
        setDealModalOpen(true)
    }

    const handleViewAppraisal = (appraisal) => {
        setSelectedAppraisal(appraisal)
        setViewModalOpen(true)
    }

    const handleEditAppraisal = (appraisal) => {
        setSelectedAppraisal(appraisal)
        setModalMode('edit')
        setDealModalOpen(true)
    }

    const handleDeleteAppraisal = (appraisal) => {
        setSelectedAppraisal(appraisal)
        setDeleteModalOpen(true)
    }

    const handleDealModalSave = (dealData) => {
        if (modalMode === 'create') {
            const newId = `appr-${Date.now()}`
            const base = {
                id: newId,
                status: dealData.status || 'pending',
                propertyType: dealData.propertyType || 'Departamento',
                valueRange: dealData.valueRange || '',
                visitDate: dealData.visitDate,
                agent: dealData.agent
            }
            const newAppraisal = mapDealToAppraisal({ ...dealData, id: newId }, base)
            setAppraisals((previous) => [...previous, newAppraisal])
            toast.success('Tasación creada', 'La tasación se creó correctamente.')
        } else if (modalMode === 'edit' && selectedAppraisal) {
            const updatedAppraisal = mapDealToAppraisal(dealData, selectedAppraisal)
            setAppraisals((previous) =>
                previous.map((item) => (item.id === updatedAppraisal.id ? { ...item, ...updatedAppraisal } : item))
            )
            toast.success('Tasación actualizada', 'La tasación se actualizó correctamente.')
        }
    }

    const handleConfirmDelete = (appraisalId) => {
        if (!appraisalId) {
            return
        }

        setAppraisals((previous) => previous.filter((item) => item.id !== appraisalId))
        setSelectedIds((previous) => previous.filter((id) => id !== appraisalId))
        toast.success('Tasación eliminada', 'La tasación se eliminó correctamente.')
    }

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) {
            return
        }
        setBulkDeleteModalOpen(true)
    }

    const handleConfirmBulkDelete = () => {
        if (selectedIds.length === 0) {
            return
        }
        setAppraisals((previous) => previous.filter((item) => !selectedIds.includes(item.id)))
        setSelectedIds([])
        toast.success('Tasaciones eliminadas', 'Las tasaciones seleccionadas fueron eliminadas.')
    }

    const handleDownload = (format, dateRange) => {
        console.log('Descargar tasaciones', format, dateRange)
        toast.success('Descarga iniciada', 'Tus tasaciones se están preparando.')
    }

    const totalsByStatus = useMemo(() => {
        return appraisals.reduce(
            (acc, item) => {
                acc[item.status] = (acc[item.status] ?? 0) + 1
                return acc
            },
            { pending: 0, scheduled: 0, in_progress: 0, completed: 0 }
        )
    }, [appraisals])

    return (
        <div className={styles.appraisalsContainer}>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div className={styles.headerActions}>
                        <Button variant="primary" icon="plus" onClick={handleAddAppraisal}>
                            Nueva tasación
                        </Button>
                    </div>
                </header>

                <section className={styles.statsSection}>
                    {statusTabs.slice(1).map((tab) => {
                        const IconComponent = tab.icon
                        const count = totalsByStatus[tab.id] ?? 0
                        const isActive = statusTab === tab.id

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                className={`${styles.statCard} ${isActive ? styles.statCardActive : ''}`}
                                onClick={() => {
                                    if (isActive) {
                                        setStatusTab('all')
                                        setSelectedStatus(null)
                                        return
                                    }

                                    setStatusTab(tab.id)
                                    const matchingOption = statusOptions.find((option) => option.value === tab.id)
                                    setSelectedStatus(matchingOption ?? null)
                                }}
                            >
                                <div className={styles.statHeader}>
                                    <IconComponent size={20} /> {tab.label}
                                </div>
                                <span className={styles.statValue}>{count}</span>
                            </button>
                        )
                    })}
                </section>

                <section className={styles.filtersCard}>
                    <div className={styles.controlHeader}>
                        <div className={styles.searchBox}>
                            <MagnifyingGlass className={styles.searchIcon} weight="bold" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Buscar por cliente, correo, teléfono o dirección"
                                className={styles.searchInput}
                            />
                        </div>

                        <div className={styles.iconGroup}>
                            <button
                                type="button"
                                className={styles.iconButton}
                                aria-label="Exportar tasaciones"
                                onClick={() => setDownloadModalOpen(true)}
                            >
                                <DownloadSimple weight="bold" />
                            </button>
                            {selectedIds.length > 0 && (
                                <button
                                    type="button"
                                    className={styles.bulkDeleteButton}
                                    onClick={handleBulkDelete}
                                >
                                    Eliminar ({selectedIds.length})
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.filtersRow}>
                        <Select
                            options={statusOptions}
                            value={selectedStatus ?? statusOptions.find((option) => option.value === statusTab)}
                            onChange={(option) => {
                                if (!option || option.value === 'all') {
                                    setSelectedStatus(null)
                                    setStatusTab('all')
                                    return
                                }

                                setSelectedStatus(option)
                                setStatusTab(option.value)
                            }}
                            placeholder="Estado"
                            isClearable
                            className={styles.filterSelect}
                        />
                        <Select
                            options={typeOptions}
                            value={selectedType}
                            onChange={setSelectedType}
                            placeholder="Tipo de propiedad"
                            isClearable
                            className={styles.filterSelect}
                        />
                    </div>
                </section>

                <section className={styles.tableSection}>
                    <AppraisalsDataTable
                        data={filteredAppraisals}
                        selectedIds={selectedIds}
                        onSelectionChange={handleSelectionChange}
                        onView={handleViewAppraisal}
                        onEdit={handleEditAppraisal}
                        onDelete={handleDeleteAppraisal}
                    />
                </section>
            </div>

            <ViewDealModal
                deal={currentDeal}
                isOpen={viewModalOpen}
                onClose={() => {
                    setViewModalOpen(false)
                    setSelectedAppraisal(null)
                }}
                entityType="appraisal"
            />

            <DealModal
                deal={modalMode === 'create' ? null : currentDeal}
                isOpen={dealModalOpen}
                onClose={() => {
                    setDealModalOpen(false)
                    setSelectedAppraisal(null)
                    setModalMode('view')
                }}
                onSave={handleDealModalSave}
                mode={modalMode}
                entityType="appraisal"
            />

            <DeleteDealModal
                deal={currentDeal}
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false)
                    setSelectedAppraisal(null)
                }}
                onConfirm={handleConfirmDelete}
                entityType="appraisal"
            />

            <DeleteDealModal
                deal={selectedIds.length > 0 ? { id: 'bulk', name: `${selectedIds.length} tasaciones seleccionadas` } : null}
                isOpen={bulkDeleteModalOpen}
                onClose={() => setBulkDeleteModalOpen(false)}
                onConfirm={handleConfirmBulkDelete}
                isBulkDelete
                entityType="appraisal"
            />

            <DownloadModal
                isOpen={downloadModalOpen}
                onClose={() => setDownloadModalOpen(false)}
                onDownload={handleDownload}
            />
        </div>
    )
}

export default Tasaciones