import React, { useState, useEffect } from 'react'
import { DownloadSimple, MagnifyingGlass } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import Pagination from '../../../components/common/Pagination/Pagination'
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal'
import { useToast } from '../../../contexts/ToastContext'
import { useVentures } from '../hooks'
import StageTabs from '../components/StageTabs'
import FilterDropdown from '../components/FilterDropdown'
import VenturesTable from '../components/VenturesTable'
import ViewVentureModal from '../components/ViewVentureModal'
import EmptyTableState from '../components/EmptyTableState'
import DownloadModal from '../components/DownloadModal'
import { useNavigate } from 'react-router-dom'
import styles from './VenturesPage.module.css'

const VenturesPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const {
    ventures,
    summary,
    tags,
    loading,
    filters,
    pagination,
    updateFilters,
    changePage,
    exportVentures,
    deleteVenture,
    deleteMultipleVentures
  } = useVentures()

  const [selectedVentures, setSelectedVentures] = useState([])
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedVenture, setSelectedVenture] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [ventureToDelete, setVentureToDelete] = useState(null)
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const handleSearch = (e) => {
    updateFilters({ search: e.target.value })
  }

  const handleStageChange = (stage) => {
    updateFilters({ stage })
  }

  const handleTagChange = (tag) => {
    updateFilters({ tag })
  }

  const handleSelectVenture = (ventureId) => {
    setSelectedVentures(prev =>
      prev.includes(ventureId)
        ? prev.filter(id => id !== ventureId)
        : [...prev, ventureId]
    )
  }

  const handleSelectAll = () => {
    if (selectedVentures.length === ventures.length) {
      setSelectedVentures([])
    } else {
      setSelectedVentures(ventures.map(venture => venture.id))
    }
  }

  const handleViewVenture = (venture) => {
    setSelectedVenture(venture)
    setViewModalOpen(true)
  }

  const handleEditVenture = (venture) => {
    navigate(`/emprendimientos/${venture.id}`)
  }

  const handleAddVenture = () => {
    navigate('/emprendimientos/nuevo')
  }

  const handleDeleteVenture = (venture) => {
    setVentureToDelete(venture)
    setDeleteModalOpen(true)
  }

  const handleExport = () => {
    setDownloadModalOpen(true)
  }

  const handleDownload = (format, dateRange) => {
    exportVentures(format, dateRange)
    toast.success('Descarga iniciada', 'El archivo se descargará en breve.')
  }

  const handleConfirmDelete = async (ventureId) => {
    try {
      if (!ventureId) {
        setDeleteModalOpen(false)
        setVentureToDelete(null)
        return
      }
      await deleteVenture(ventureId)
      setDeleteModalOpen(false)
      setVentureToDelete(null)
      toast.success('Emprendimiento eliminado', 'El emprendimiento se eliminó correctamente.')
    } catch (error) {
      console.error('Error deleting venture:', error)
      toast.error('Error al eliminar', 'No se pudo eliminar el emprendimiento.')
    }
  }

  const handleBulkDelete = () => {
    if (selectedVentures.length > 0) {
      setBulkDeleteModalOpen(true)
    }
  }

  const handleConfirmBulkDelete = async () => {
    try {
      await deleteMultipleVentures(selectedVentures)
      setSelectedVentures([])
      setBulkDeleteModalOpen(false)
      toast.success('Emprendimientos eliminados', 'Los emprendimientos seleccionados fueron eliminados.')
    } catch (error) {
      console.error('Error deleting ventures:', error)
      toast.error('Error al eliminar', 'No se pudieron eliminar los emprendimientos seleccionados.')
    }
  }

  const stageOptions = [
    { value: 'Todos', label: 'Todos' },
    ...summary.map(stage => ({ value: stage.stage, label: stage.stage }))
  ]

  const tagOptions = [
    { value: 'Todos', label: 'Todos' },
    ...tags
  ]

  useEffect(() => {
    if (selectedVenture && viewModalOpen) {
      const updatedVenture = ventures.find(v => v.id === selectedVenture.id)
      if (updatedVenture) {
        setSelectedVenture(updatedVenture)
      }
    }
  }, [ventures, viewModalOpen])

  return (
    <div className={styles.venturesContainer}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerActions}>
            <Button variant="primary" icon="plus" onClick={handleAddVenture}>
              Agregar nuevo emprendimiento
            </Button>
          </div>
        </header>

        <section className={styles.summarySection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Estado del emprendimiento</h3>
            <span className={styles.sectionHint}>Resumen de emprendimientos por etapa</span>
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
                placeholder="Buscar por título, ubicación, tag y administrador"
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
              <Button variant="ghost" size="small" icon="plus" onClick={handleAddVenture}>
                Nuevo
              </Button>
              {selectedVentures.length > 0 && (
                <button
                  className={styles.bulkDeleteBtn}
                  aria-label="Eliminar seleccionados"
                  onClick={handleBulkDelete}
                >
                  Eliminar ({selectedVentures.length})
                </button>
              )}
            </div>
          </div>

          <div className={styles.filtersRow}>
            <FilterDropdown
              label="Tag"
              options={tagOptions}
              value={filters.tag}
              onChange={handleTagChange}
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
            ) : ventures.length === 0 ? (
              <EmptyTableState onAddNew={handleAddVenture} />
            ) : (
              <>
                <VenturesTable
                  ventures={ventures}
                  selectedVentures={selectedVentures}
                  onSelectVenture={handleSelectVenture}
                  onSelectAll={handleSelectAll}
                  onViewVenture={handleViewVenture}
                  onEditVenture={handleEditVenture}
                  onDeleteVenture={handleDeleteVenture}
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

      <ViewVentureModal
        venture={selectedVenture}
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setSelectedVenture(null)
        }}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setVentureToDelete(null)
        }}
        onConfirm={() => handleConfirmDelete(ventureToDelete?.id)}
        title="Eliminar emprendimiento"
        message={ventureToDelete ? `¿Seguro que deseas eliminar el emprendimiento "${ventureToDelete.title}"?` : ''}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Eliminar emprendimientos"
        message={`¿Seguro que deseas eliminar ${selectedVentures.length} emprendimiento${selectedVentures.length > 1 ? 's' : ''}?`}
        type="danger"
        confirmText="Eliminar"
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

export default VenturesPage
