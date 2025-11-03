import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal';
import { useToast } from '../../../contexts/ToastContext';
import {
    NetworkFilters,
    NetworksTable,
    NetworkFormModal,
    NetworkPropertyDetailsModal,
    AdvancedFiltersModal,
    MapPreviewModal
} from '../components';
import useNetworks from '../hooks/useNetworks';
import styles from './NetworksPage.module.css';

const NetworksPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const {
        networks,
        selectedNetworkId,
        searchTerm,
        setSearchTerm,
        includeMineOnly,
        toggleIncludeMineOnly,
        setIncludeMineOnly,
        showFavoritesOnly,
        toggleFavoritesOnly,
        setShowFavoritesOnly,
        filters,
        updateFilter,
        clearFilters,
        filterOptions,
        sortOption,
        setSortOption,
        properties,
        selectedPropertyIds,
        selectProperties,
        togglePropertyFavorite,
        removePropertiesFromNetwork,
        createNetwork,
        selectionStats
    } = useNetworks();

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isAdvancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
    const [isMapModalOpen, setMapModalOpen] = useState(false);
    const [detailProperty, setDetailProperty] = useState(null);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [pendingRemoval, setPendingRemoval] = useState(null);
    const [isBulkRemoval, setIsBulkRemoval] = useState(false);

    const totalProperties = properties.length;

    const handleSubmitCreate = (payload) => {
        const network = createNetwork(payload);
        toast.success('Red creada', `Se creó la red ${network.name}.`);
        setCreateModalOpen(false);
    };

    const handleApplyAdvancedFilters = ({ coverage, quality, includeMineOnly: mine, showFavoritesOnly: favorites }) => {
        updateFilter('coverage', coverage);
        updateFilter('quality', quality ? String(quality) : null);
        setIncludeMineOnly(Boolean(mine));
        setShowFavoritesOnly(Boolean(favorites));
        setAdvancedFiltersOpen(false);
        toast.info('Filtros aplicados', 'Actualizamos la vista según los filtros avanzados.');
    };

    const handleToggleFavorite = (property) => {
        togglePropertyFavorite(property.id);
        toast.info(
            property.isFavorite ? 'Quitaste de favoritos' : 'Marcaste como favorita',
            property.address
        );
    };

    const handleRemoveProperty = (property) => {
        setDetailsModalOpen(false);
        setDetailProperty(null);
        setPendingRemoval(property);
        setIsBulkRemoval(false);
        setConfirmModalOpen(true);
    };

    const handleBulkRemove = () => {
        if (selectedPropertyIds.length === 0) {
            return;
        }
        setPendingRemoval(null);
        setIsBulkRemoval(true);
        setConfirmModalOpen(true);
    };

    const handleConfirmRemoval = () => {
        if (isBulkRemoval) {
            removePropertiesFromNetwork(selectedPropertyIds);
            toast.success('Propiedades eliminadas', 'Se eliminaron las propiedades seleccionadas de la red.');
        } else if (pendingRemoval) {
            removePropertiesFromNetwork([pendingRemoval.id]);
            toast.success('Propiedad eliminada', `${pendingRemoval.address} salió de la red.`);
        }
        setConfirmModalOpen(false);
        setPendingRemoval(null);
    };

    const handleViewProperty = (property) => {
        setDetailProperty(property);
        setDetailsModalOpen(true);
    };

    const handleGoToMap = () => {
        setMapModalOpen(false);
        navigate('/mapa');
    };

    const handleViewExternalFromModal = () => {
        toast.info('Próximamente', 'Estamos preparando la ficha detallada de la propiedad.');
    };

    const selectedNetworkName = networks.find((network) => network.id === selectedNetworkId)?.name ?? 'Sin red';

    return (
        <div className={styles.pageContainer}>
            <div className={styles.layout}>
                <div className={styles.actionsBar}>
                    <Button variant="primary" icon="plus" onClick={() => setCreateModalOpen(true)}>
                        Crear nueva red
                    </Button>
                </div>

                <NetworkFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    includeMineOnly={includeMineOnly}
                    onToggleIncludeMine={toggleIncludeMineOnly}
                    showFavoritesOnly={showFavoritesOnly}
                    onToggleFavoritesOnly={toggleFavoritesOnly}
                    filters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearFilters}
                    filterOptions={filterOptions}
                    onOpenAdvancedFilters={() => setAdvancedFiltersOpen(true)}
                    onOpenMap={() => setMapModalOpen(true)}
                    onBulkRemove={handleBulkRemove}
                    selectionStats={selectionStats}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                />

                <NetworksTable
                    data={properties}
                    selectedIds={selectedPropertyIds}
                    onSelectionChange={selectProperties}
                    onViewProperty={handleViewProperty}
                    onOpenDetails={handleViewProperty}
                    onToggleFavorite={handleToggleFavorite}
                    onRemoveProperty={handleRemoveProperty}
                />
            </div>

            <NetworkFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleSubmitCreate}
            />

            <AdvancedFiltersModal
                isOpen={isAdvancedFiltersOpen}
                onClose={() => setAdvancedFiltersOpen(false)}
                onApply={handleApplyAdvancedFilters}
                coverages={filterOptions.coverages}
                initialCoverage={filters.coverage}
                initialQuality={filters.quality}
                includeMineOnly={includeMineOnly}
                showFavoritesOnly={showFavoritesOnly}
            />

            <MapPreviewModal
                isOpen={isMapModalOpen}
                onClose={() => setMapModalOpen(false)}
                onOpenMap={handleGoToMap}
                propertiesCount={totalProperties}
            />

            <NetworkPropertyDetailsModal
                isOpen={isDetailsModalOpen}
                property={detailProperty}
                onClose={() => setDetailsModalOpen(false)}
                onToggleFavorite={handleToggleFavorite}
                onRemove={handleRemoveProperty}
                onViewExternal={handleViewExternalFromModal}
            />

            <ConfirmModal
                isOpen={confirmModalOpen}
                onClose={() => {
                    setConfirmModalOpen(false);
                    setPendingRemoval(null);
                }}
                onConfirm={handleConfirmRemoval}
                title={isBulkRemoval ? 'Eliminar propiedades seleccionadas' : 'Remover propiedad'}
                message={
                    isBulkRemoval
                        ? `¿Seguro que deseas eliminar ${selectedPropertyIds.length} propiedades de la red ${selectedNetworkName}?`
                        : pendingRemoval
                            ? `¿Deseas remover ${pendingRemoval.address} de la red ${selectedNetworkName}?`
                            : ''
                }
                type="danger"
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    );
};

export default NetworksPage;

