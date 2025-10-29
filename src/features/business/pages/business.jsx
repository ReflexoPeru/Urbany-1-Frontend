import React, { useState } from 'react'
import { DownloadSimple, Plus, CalendarBlank, MagnifyingGlass } from 'phosphor-react'
import { useBusiness } from '../hooks/useBusiness'
import StageTabs from '../components/StageTabs'
import FilterDropdown from '../components/FilterDropdown'
import BusinessTable from '../components/BusinessTable'
import Pagination from '../components/Pagination'
import CalendarModal from '../components/CalendarModal'
import DealModal from '../components/DealModal'
import DeleteDealModal from '../components/DeleteDealModal'
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
      await deleteDeal(dealId)
      setDeleteModalOpen(false)
    } catch (error) {
      console.error('Error deleting deal:', error)
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
    } catch (error) {
      console.error('Error deleting deals:', error)
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
    <div className={styles.container}>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className={styles.title}>Negocios</h2>
          <button className={styles.addButton} onClick={handleAddBusiness}>
            Agregar nuevo negocio
          </button>
        </div>

        <h3 className={styles.sectionTitle}>Estado del Negocio</h3>
        <StageTabs
          stages={summary}
          activeStage={filters.stage}
          onStageChange={handleStageChange}
        />

        <div className={styles.search}>
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
        </div>

        <div className={styles.toolbar}>
          <div className={styles.chipGroup}>
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
              label="Todos"
              options={stageOptions}
              value={filters.stage}
              onChange={handleStageChange}
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
            <button
              className={styles.iconBtn}
              aria-label="Agregar"
              onClick={handleAddBusiness}
            >
              <Plus weight="bold" />
            </button>
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
              onPageChange={changePage}
            />
          </>
        )}
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

      <DeleteDealModal
        deal={dealToDelete}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <DeleteDealModal
        deal={{ 
          name: `${selectedDeals.length} negocios seleccionados`,
          id: selectedDeals
        }}
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        isBulkDelete={true}
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