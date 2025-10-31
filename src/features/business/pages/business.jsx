import React, { useState } from 'react'
import { DownloadSimple, CalendarBlank, MagnifyingGlass } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import Pagination from '../../../components/common/Pagination/Pagination'
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal'
import { useToast } from '../../../contexts/ToastContext'
import { useBusiness } from '../hooks/useBusiness'
import StageTabs from '../components/StageTabs'
import FilterDropdown from '../components/FilterDropdown'
import BusinessTable from '../components/BusinessTable'
import CalendarModal from '../components/CalendarModal'
import DealModal from '../components/DealModal'
import EmptyTableState from '../components/EmptyTableState'
import DownloadModal from '../components/DownloadModal'
import styles from './Business.module.css'

const Business = () => {
  const {
    deals,
    summary,
    agents,
    tags,
    loading,
    filters,
    pagination,
    updateFilters,
    changePage,
    exportDeals,
    addDeal,
    updateDeal,
    deleteDeal,
    deleteMultipleDeals
  } = useBusiness()

  const { toast } = useToast()

  const [selectedDeals, setSelectedDeals] = useState([])
  const [dealModalOpen, setDealModalOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [modalMode, setModalMode] = useState('view')
  const [calendarModalOpen, setCalendarModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [dealToDelete, setDealToDelete] = useState(null)
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const handleSearch = (e) => {
    updateFilters({ search: e.target.value })
  }

  const handleStageChange = (stage) => {
    updateFilters({ stage })
  }

  const handleAgentChange = (agent) => {
    updateFilters({ agent })
  }

  const handleTagsChange = (tags) => {
    updateFilters({ tags })
  }

  const handleSelectDeal = (dealId) => {
    setSelectedDeals(prev =>
      prev.includes(dealId)
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    )
  }

  const handleSelectAll = () => {
    if (selectedDeals.length === deals.length) {
      setSelectedDeals([])
    } else {
      setSelectedDeals(deals.map(deal => deal.id))
    }
  }

  const handleViewDeal = (deal) => {
    setSelectedDeal(deal)
    setModalMode('view')
    setDealModalOpen(true)
  }

  const handleAddBusiness = () => {
    setSelectedDeal(null)
    setModalMode('create')
    setDealModalOpen(true)
  }

  const handleCloseModal = () => {
    setDealModalOpen(false)
    setSelectedDeal(null)
    setModalMode('view')
  }

  const handleExport = () => {
    setDownloadModalOpen(true)
  }

  const handleDownload = (format, dateRange) => {
    exportDeals(format, dateRange)
  }

  const handleCalendar = () => {
    setCalendarModalOpen(true)
  }

  const handleEditDeal = (deal) => {
    setSelectedDeal(deal)
    setModalMode('edit')
    setDealModalOpen(true)
  }

  const handleDeleteDeal = (deal) => {
    setDealToDelete(deal)
    setDeleteModalOpen(true)
  }

  const handleSaveDeal = async (dealData) => {
    try {
      if (modalMode === 'create') {
        await addDeal(dealData)
      } else {
        await updateDeal(dealData)
      }
      setDealModalOpen(false)
    } catch (error) {
      console.error('Error saving deal:', error)
    }
  }

  const handleConfirmDelete = async (dealId) => {
    try {
      if (!dealId) {
        setDeleteModalOpen(false)
        setDealToDelete(null)
        return
      }

      await deleteDeal(dealId)
      setDeleteModalOpen(false)
      setDealToDelete(null)
      toast.success('Negocio eliminado', 'El negocio se eliminó correctamente.')
    } catch (error) {
      console.error('Error deleting deal:', error)
      toast.error('Error al eliminar', 'No se pudo eliminar el negocio.')
    }
  }

  const handleBulkDelete = () => {
    if (selectedDeals.length > 0) {
      setBulkDeleteModalOpen(true)
    }
  }

  const handleConfirmBulkDelete = async () => {
    try {
      await deleteMultipleDeals(selectedDeals)
      setSelectedDeals([])
      setBulkDeleteModalOpen(false)
      toast.success('Negocios eliminados', 'Los negocios seleccionados fueron eliminados.')
    } catch (error) {
      console.error('Error deleting deals:', error)
      toast.error('Error al eliminar', 'No se pudieron eliminar los negocios seleccionados.')
    }
  }

  const stageOptions = [
    { value: 'Todos', label: 'Todos' },
    ...summary.map(stage => ({ value: stage.stage, label: stage.stage }))
  ]

  const agentOptions = [
    { value: 'Todos', label: 'Todos' },
    ...agents
  ]

  const tagOptions = tags

  return (
    <div className={styles.businessContainer}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerActions}>
            <Button variant="primary" icon="plus" onClick={handleAddBusiness}>
              Agregar nuevo negocio
            </Button>
          </div>
        </header>

        <section className={styles.summarySection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Estado del negocio</h3>
            <span className={styles.sectionHint}>Resumen de operaciones por etapa</span>
          </div>
          <StageTabs
            stages={summary}
            activeStage={filters.stage}
            onStageChange={handleStageChange}
          />
        </section>

        <section className={styles.tableSection}>
          <div className={styles.controlHeader}>
            <div className={styles.searchBox}>
              <MagnifyingGlass className={styles.searchIcon} weight="bold" />
              <input
                placeholder="Buscar por nombre, correo electrónico, teléfono y propiedad"
                className={styles.searchInput}
                type="text"
                value={filters.search}
                onChange={handleSearch}
              />
            </div>

            <div className={styles.iconGroup}>
              <button
                className={styles.iconBtn}
                aria-label="Descargar"
                onClick={handleExport}
              >
                <DownloadSimple weight="bold" />
              </button>
              <Button variant="ghost" size="small" icon="plus" onClick={handleAddBusiness}>
                Nuevo
              </Button>
              <button
                className={styles.iconBtn}
                aria-label="Calendario"
                onClick={handleCalendar}
              >
                <CalendarBlank weight="bold" />
              </button>
              {selectedDeals.length > 0 && (
                <button
                  className={styles.bulkDeleteBtn}
                  aria-label="Eliminar seleccionados"
                  onClick={handleBulkDelete}
                >
                  Eliminar ({selectedDeals.length})
                </button>
              )}
            </div>
          </div>

          <div className={styles.filtersRow}>
            <FilterDropdown
              label="Agente"
              options={agentOptions}
              value={filters.agent}
              onChange={handleAgentChange}
            />
            <FilterDropdown
              label="Estado"
              options={[
                { value: 'Todos', label: 'Todos' },
                { value: 'Disponible', label: 'Disponible' },
                { value: 'No disponible', label: 'No disponible' }
              ]}
              value={filters.status || 'Todos'}
              onChange={(status) => updateFilters({ status: status === 'Todos' ? '' : status })}
            />
            <FilterDropdown
              label="Etiquetas"
              options={tagOptions}
              value={filters.tags}
              onChange={handleTagsChange}
              multiple={true}
            />
            <FilterDropdown
              label="Etapa"
              options={stageOptions}
              value={filters.stage}
              onChange={handleStageChange}
            />
          </div>

          <div className={styles.tableContent}>
            {loading ? (
              <div className={styles.loading}>Cargando...</div>
            ) : deals.length === 0 ? (
              <EmptyTableState onAddNew={handleAddBusiness} />
            ) : (
              <>
                <BusinessTable
                  deals={deals}
                  selectedDeals={selectedDeals}
                  onSelectDeal={handleSelectDeal}
                  onSelectAll={handleSelectAll}
                  onViewDeal={handleViewDeal}
                  onEditDeal={handleEditDeal}
                  onDeleteDeal={handleDeleteDeal}
                />

                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.total}
                  itemsPerPage={filters.limit}
                  onPageChange={changePage}
                />
              </>
            )}
          </div>
        </section>
      </div>

      <DealModal
        deal={selectedDeal}
        isOpen={dealModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveDeal}
        mode={modalMode}
      />

      <CalendarModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        deals={deals}
        onViewDeal={handleViewDeal}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setDealToDelete(null)
        }}
        onConfirm={() => handleConfirmDelete(dealToDelete?.id)}
        title="Eliminar negocio"
        message={dealToDelete ? `¿Seguro que deseas eliminar el negocio de ${dealToDelete.name}?` : ''}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Eliminar negocios seleccionados"
        message={`¿Seguro que deseas eliminar ${selectedDeals.length} negocios seleccionados?`}
        type="danger"
        confirmText="Eliminar todos"
        cancelText="Cancelar"
      />

      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        onDownload={handleDownload}
      />
    </div>
  )
}

export default Business