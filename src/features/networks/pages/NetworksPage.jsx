import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal';
import { useToast } from '../../../contexts/ToastContext';
import {
    NetworkFilters,
    AdvancedFiltersModal,
    MapPreviewModal,
    NetworkDetailsModal
} from '../components';
import NetworkPropertyDetailsModal from '../components/NetworkPropertyDetailsModal';
import VenturesTable from '../../emprendimientos/components/VenturesTable';
import { useNetworks } from '../hooks/useNetworks';
import styles from './NetworksPage.module.css';
import slugify from '../../../utils/slugify';

const formatPriceLabel = (value, currency) => {
    if (value === undefined || value === null) {
        return 'Sin precio';
    }
    try {
        const formatted = new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: 0
        }).format(Number(value));
        return currency ? `${currency} ${formatted}` : formatted;
    } catch {
        return currency ? `${currency} ${value}` : String(value);
    }
};

const mapPropertyToVenture = (property, networkName) => {
    const locationParts = [property.city, property.neighborhood].filter(Boolean);
    const location = locationParts.length > 0 ? locationParts.join(' · ') : 'Sin ubicación';
    const priceLabel = formatPriceLabel(property.price, property.currency);
    const commissionLabel = property.commission != null ? `${property.commission}% comisión` : 'Sin comisión';

    return {
        id: property.id,
        title: property.address || 'Sin dirección',
        location,
        tag: property.code || property.coverage || commissionLabel,
        administrator: property.realEstate?.name
            ? `${property.realEstate.name}${property.commission != null ? ` · ${property.commission}%` : ''}`
            : commissionLabel,
        stage: property.operation || property.propertyType || 'Sin tipo',
        createdAt: property.publishedAt,
        imageUrl: property.image,
        description: property.description || '',
        characteristics: {
            delivery: property.coverage || 'Sin cobertura',
            price: priceLabel,
            units: commissionLabel,
            floors: property.quality != null ? `${property.quality}% calidad` : 'Sin dato',
            parking: property.contact?.phone || 'Sin contacto',
            apartments: property.bedrooms != null ? `${property.bedrooms} dorm.` : 'Sin dato',
            offices: property.bathrooms != null ? `${property.bathrooms} baños` : 'Sin dato'
        },
        amenities: {
            runningWater: Boolean(property.isFavorite),
            heating: Boolean(property.isMine),
            boiler: false,
            boxDeposit: false
        },
        networkName
    };
};

const NetworksPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const {
        selectedNetwork,
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
        clearSelection,
        togglePropertyFavorite,
        removePropertiesFromNetwork,
        updateProperty,
        selectionStats
    } = useNetworks();

    const [isAdvancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
    const [isMapModalOpen, setMapModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [pendingRemoval, setPendingRemoval] = useState(null);
    const [isBulkRemoval, setIsBulkRemoval] = useState(false);
    const [isNetworkDetailsOpen, setNetworkDetailsOpen] = useState(false);
    const [detailProperty, setDetailProperty] = useState(null);
    const [detailMode, setDetailMode] = useState('view');
    const [propertyModalOpen, setPropertyModalOpen] = useState(false);

    const totalProperties = properties.length;

    const ventures = useMemo(
        () => properties.map((property) => mapPropertyToVenture(property, selectedNetwork?.name ?? '')),
        [properties, selectedNetwork]
    );

    const propertyMap = useMemo(
        () => properties.reduce((accumulator, property) => {
            accumulator[property.id] = property;
            return accumulator;
        }, {}),
        [properties]
    );

    useEffect(() => {
        if (propertyModalOpen && detailProperty) {
            const updated = propertyMap[detailProperty.id];
            if (updated && updated !== detailProperty) {
                setDetailProperty(updated);
            }
        }
    }, [propertyMap, propertyModalOpen, detailProperty]);

    const handleApplyAdvancedFilters = ({ coverage, quality, includeMineOnly: mine, showFavoritesOnly: favorites }) => {
        updateFilter('coverage', coverage);
        updateFilter('quality', quality ? String(quality) : null);
        setIncludeMineOnly(Boolean(mine));
        setShowFavoritesOnly(Boolean(favorites));
        setAdvancedFiltersOpen(false);
        toast.info('Filtros aplicados', 'Actualizamos la vista según los filtros avanzados.');
    };

    const handleRemoveProperty = (property) => {
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
        const removedIds = isBulkRemoval ? [...selectedPropertyIds] : pendingRemoval ? [pendingRemoval.id] : [];
        if (isBulkRemoval) {
            removePropertiesFromNetwork(selectedPropertyIds);
            toast.success('Propiedades eliminadas', 'Se eliminaron las propiedades seleccionadas de la red.');
        } else if (pendingRemoval) {
            removePropertiesFromNetwork([pendingRemoval.id]);
            toast.success('Propiedad eliminada', `${pendingRemoval.address} salió de la red.`);
        }
        if (removedIds.includes(detailProperty?.id)) {
            setPropertyModalOpen(false);
            setDetailProperty(null);
            setDetailMode('view');
        }
        clearSelection();
        setConfirmModalOpen(false);
        setPendingRemoval(null);
    };

    const openPropertyModal = (property, mode = 'view') => {
        setDetailProperty(property);
        setDetailMode(mode);
        setPropertyModalOpen(true);
    };

    const handleViewProperty = (property) => {
        openPropertyModal(property, 'view');
    };

    const handleEditProperty = (property) => {
        openPropertyModal(property, 'edit');
    };

    const handleToggleFavorite = (property) => {
        togglePropertyFavorite(property.id);
        toast.info(
            property.isFavorite ? 'Quitaste de favoritos' : 'Marcaste como favorita',
            property.address
        );
        if (detailProperty?.id === property.id) {
            setDetailProperty((previous) => (
                previous
                    ? { ...previous, isFavorite: !previous.isFavorite }
                    : previous
            ));
        }
    };

    const handleGoToMap = () => {
        setMapModalOpen(false);
        navigate('/mapa');
    };

    const closePropertyModal = () => {
        setPropertyModalOpen(false);
        setDetailProperty(null);
        setDetailMode('view');
    };

    const handleViewExternalFromModal = (property) => {
        if (!property) {
            return;
        }
        closePropertyModal();
        navigate(`/redes/propiedades/${property.id}`, { state: { property } });
    };

    const handleViewRealEstateFromModal = (property) => {
        if (!property?.realEstate?.name) {
            toast.info('Sin inmobiliaria', 'Esta propiedad no tiene una inmobiliaria asociada.');
            return;
        }
        const realEstateSlug = slugify(property.realEstate.name);
        closePropertyModal();
        navigate(`/redes/inmobiliarias/${realEstateSlug}`, {
            state: {
                realEstateName: property.realEstate.name
            }
        });
    };

    const handleClearFilters = () => {
        clearFilters();
        setSearchTerm('');
    };

    const selectedNetworkName = selectedNetwork?.name ?? 'Sin red';

    const handleSelectVenture = (ventureId) => {
        if (selectedPropertyIds.includes(ventureId)) {
            selectProperties(selectedPropertyIds.filter((id) => id !== ventureId));
        } else {
            selectProperties([...selectedPropertyIds, ventureId]);
        }
    };

    const handleSelectAllVentures = () => {
        if (selectedPropertyIds.length === ventures.length) {
            selectProperties([]);
        } else {
            selectProperties(ventures.map((venture) => venture.id));
        }
    };

    const handleViewVenture = (venture) => {
        const property = propertyMap[venture.id];
        if (property) {
            handleViewProperty(property);
        }
    };

    const handleEditVenture = (venture) => {
        const property = propertyMap[venture.id];
        if (property) {
            handleEditProperty(property);
        }
    };

    const handleDeleteVenture = (venture) => {
        const property = propertyMap[venture.id];
        if (property) {
            handleRemoveProperty(property);
        }
    };

    const handleCreateNetwork = () => {
        navigate('/redes/nueva');
    };

    const handleEditSelectedNetwork = () => {
        if (selectedNetwork) {
            navigate(`/redes/${selectedNetwork.id}`);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.layout}>
                <div className={styles.actionsBar}>
                    <Button variant="primary" icon="plus" onClick={handleCreateNetwork}>
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
                    onClearFilters={handleClearFilters}
                    filterOptions={filterOptions}
                    onOpenAdvancedFilters={() => setAdvancedFiltersOpen(true)}
                    onOpenMap={() => setMapModalOpen(true)}
                    onBulkRemove={handleBulkRemove}
                    selectionStats={selectionStats}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    onViewNetwork={() => setNetworkDetailsOpen(true)}
                    onEditNetwork={handleEditSelectedNetwork}
                    selectedNetwork={selectedNetwork}
                />

                <section className={styles.tableCard}>
                    <VenturesTable
                        ventures={ventures}
                        selectedVentures={selectedPropertyIds}
                        onSelectVenture={handleSelectVenture}
                        onSelectAll={handleSelectAllVentures}
                        onViewVenture={handleViewVenture}
                        onEditVenture={handleEditVenture}
                        onDeleteVenture={handleDeleteVenture}
                    />
                </section>
            </div>

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
                isOpen={propertyModalOpen}
                property={detailProperty}
                initialMode={detailMode}
                onClose={() => {
                    closePropertyModal();
                }}
                onToggleFavorite={handleToggleFavorite}
                onRemove={(property) => {
                    handleRemoveProperty(property);
                    closePropertyModal();
                }}
                onViewExternal={handleViewExternalFromModal}
                onViewRealEstate={handleViewRealEstateFromModal}
                onUpdate={(propertyId, updates) => {
                    updateProperty(propertyId, updates);
                    toast.success('Propiedad actualizada', 'Los cambios se guardaron correctamente.');
                    setDetailProperty((previous) => (
                        previous?.id === propertyId
                            ? {
                                ...previous,
                                ...updates,
                                contact: updates?.contact
                                    ? { ...previous.contact, ...updates.contact }
                                    : previous.contact
                            }
                            : previous
                    ));
                }}
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

            <NetworkDetailsModal
                isOpen={isNetworkDetailsOpen}
                onClose={() => setNetworkDetailsOpen(false)}
                network={selectedNetwork}
            />
        </div>
    );
};

export default NetworksPage;

