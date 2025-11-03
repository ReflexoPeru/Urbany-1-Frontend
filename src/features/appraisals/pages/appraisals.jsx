import React, { useMemo, useState } from 'react'
import { DownloadSimple, MagnifyingGlass, ChartPie, CalendarCheck, HouseLine } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal'
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

const Tasaciones = () => {
    const [appraisals, setAppraisals] = useState(mockAppraisals)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusTab, setStatusTab] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [appraisalToDelete, setAppraisalToDelete] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false)

    const { toast } = useToast()

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
        console.log('Crear tasación')
    }

    const handleViewAppraisal = (appraisal) => {
        console.log('Ver tasación', appraisal)
    }

    const handleEditAppraisal = (appraisal) => {
        console.log('Editar tasación', appraisal)
    }

    const handleDeleteAppraisal = (appraisal) => {
        setAppraisalToDelete(appraisal)
        setDeleteModalOpen(true)
    }

    const handleConfirmDelete = (appraisalId) => {
        if (!appraisalId) {
            setDeleteModalOpen(false)
            setAppraisalToDelete(null)
            return
        }

        setAppraisals((previous) => previous.filter((item) => item.id !== appraisalId))
        setSelectedIds((previous) => previous.filter((id) => id !== appraisalId))
        setDeleteModalOpen(false)
        setAppraisalToDelete(null)
        toast.success('Tasación eliminada', 'La tasación se eliminó correctamente.')
    }

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) {
            return
        }
        setBulkDeleteModalOpen(true)
    }

    const handleConfirmBulkDelete = () => {
        setAppraisals((previous) => previous.filter((item) => !selectedIds.includes(item.id)))
        setSelectedIds([])
        setBulkDeleteModalOpen(false)
        toast.success('Tasaciones eliminadas', 'Las tasaciones seleccionadas fueron eliminadas.')
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
                                onClick={() => console.log('Exportar tasaciones')}
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
                        onSelectionChange={setSelectedIds}
                        onView={handleViewAppraisal}
                        onEdit={handleEditAppraisal}
                        onDelete={handleDeleteAppraisal}
                    />
                </section>
            </div>

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false)
                    setAppraisalToDelete(null)
                }}
                onConfirm={() => handleConfirmDelete(appraisalToDelete?.id)}
                title="Eliminar tasación"
                message={appraisalToDelete ? `¿Seguro que deseas eliminar la tasación de ${appraisalToDelete.clientName}?` : ''}
                type="danger"
                confirmText="Eliminar"
                cancelText="Cancelar"
            />

            <ConfirmModal
                isOpen={bulkDeleteModalOpen}
                onClose={() => setBulkDeleteModalOpen(false)}
                onConfirm={handleConfirmBulkDelete}
                title="Eliminar tasaciones seleccionadas"
                message={`¿Seguro que deseas eliminar ${selectedIds.length} tasaciones seleccionadas?`}
                type="danger"
                confirmText="Eliminar todas"
                cancelText="Cancelar"
            />
        </div>
    )
}

export default Tasaciones