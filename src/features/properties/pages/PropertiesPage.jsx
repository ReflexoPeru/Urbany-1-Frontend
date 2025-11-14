import React, { useState, useMemo, useEffect } from "react";
import { Plus, Folder, Wrench, Prohibit, CurrencyDollar, HouseSimple, FileText, House } from "phosphor-react";
import Button from "../../../components/ui/Button/Button";
import PropertiesDataTable from "../components/PropertiesDataTable";
import PropertyTabs from "../components/PropertyTabs";
import { mockProperties } from "../data/mockProperties";
import DealModal from "../../business/components/DealModal";
import ViewDealModal from "../../business/components/ViewDealModal";
import ConfirmModal from "../../../components/ui/Modal/ConfirmModal";
import { useToast } from "../../../contexts/ToastContext";
import styles from "./PropertiesPage.module.css";

const mapPropertyToModal = (property) => {
  if (!property) return null;
  return {
    id: property.id,
    name: property.address,
    address: property.address,
    city: property.city,
    propertyType: property.type,
    category: property.category,
    price: property.price,
    currency: property.currency,
    status: property.status,
    portals: property.portals || [],
    code: property.code || "",
    quality: property.quality ?? null,
    image: property.image || ""
  };
};

const mapModalToProperty = (modalData, base = {}) => {
  if (!modalData) return base;
  const portals = Array.isArray(modalData.portals) && modalData.portals.length > 0
    ? modalData.portals
    : ["Sin difundir"];

  return {
    id: modalData.id ?? base.id ?? Date.now(),
    address: modalData.address || "",
    city: modalData.city || "",
    type: modalData.propertyType || base.type || "",
    category: modalData.category || "",
    price: modalData.price !== undefined && modalData.price !== null ? Number(modalData.price) : base.price ?? 0,
    currency: modalData.currency || base.currency || "U$D",
    status: modalData.status || base.status || "active",
    portals,
    code: modalData.code || base.code || "",
    quality: modalData.quality !== undefined && modalData.quality !== null ? Number(modalData.quality) : base.quality,
    image: modalData.image || base.image || ""
  };
};

const PropertiesPage = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [activo, setActivo] = useState("activas");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const { toast } = useToast();

  // Calcular contadores para cada estado
  const counts = useMemo(() => {
    return {
      activas: properties.filter(prop => prop.status === "active").length,
      reservadas: properties.filter(prop => prop.status === "reserved").length,
      fuera: properties.filter(prop => prop.status === "off-market" || prop.status === "inactive").length,
      vendidas: properties.filter(prop => prop.status === "sold").length,
      alquiladas: properties.filter(prop => prop.status === "rented").length,
      borrador: properties.filter(prop => prop.status === "draft").length,
    };
  }, [properties]);

  const pestañas = [
    { id: "activas", label: "Activas", icon: Folder, count: counts.activas },
    { id: "reservadas", label: "Reservadas", icon: Wrench, count: counts.reservadas },
    { id: "fuera", label: "Fuera de mercado", icon: Prohibit, count: counts.fuera },
    { id: "vendidas", label: "Vendidas", icon: CurrencyDollar, count: counts.vendidas },
    { id: "alquiladas", label: "Alquiladas", icon: HouseSimple, count: counts.alquiladas },
    { id: "borrador", label: "En borrador", icon: FileText, count: counts.borrador },
  ];

  const filteredProperties = useMemo(() => {
    switch (activo) {
      case "activas":
        return properties.filter(prop => prop.status === "active");
      case "reservadas":
        return properties.filter(prop => prop.status === "reserved");
      case "vendidas":
        return properties.filter(prop => prop.status === "sold");
      case "alquiladas":
        return properties.filter(prop => prop.status === "rented");
      case "fuera":
        return properties.filter(prop => prop.status === "off-market" || prop.status === "inactive");
      case "borrador":
        return properties.filter(prop => prop.status === "draft");
      default:
        return [];
    }
  }, [activo, properties]);
  const hasData = filteredProperties.length > 0;

  useEffect(() => {
    setSelectedIds([]);
  }, [activo]);

  const handleSelectionChange = (ids) => {
    setSelectedIds(ids);
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setModalMode("create");
    setPropertyModalOpen(true);
  };

  const handlePropertyModalClose = () => {
    setPropertyModalOpen(false);
    setSelectedProperty(null);
    setModalMode("view");
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setViewModalOpen(true);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setModalMode("edit");
    setPropertyModalOpen(true);
  };

  const handleDeleteProperty = (property) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const handlePropertyModalSave = (modalData) => {
    if (modalMode === "create") {
      const newProperty = mapModalToProperty(modalData);
      setProperties(prev => [...prev, newProperty]);
      toast.success("Propiedad creada", "La propiedad se registró correctamente.");
    } else if (modalMode === "edit" && selectedProperty) {
      const updatedProperty = mapModalToProperty(modalData, selectedProperty);
      setProperties(prev => prev.map(prop => (prop.id === updatedProperty.id ? updatedProperty : prop)));
      toast.success("Propiedad actualizada", "La propiedad se actualizó correctamente.");
    }
    handlePropertyModalClose();
  };

  const handleConfirmDelete = (propertyId) => {
    if (!propertyId) {
      setDeleteModalOpen(false);
      setPropertyToDelete(null);
      return;
    }
    setProperties(prev => prev.filter(prop => prop.id !== propertyId));
    setSelectedIds(prev => prev.filter(id => id !== propertyId));
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
    toast.success("Propiedad eliminada", "La propiedad se eliminó correctamente.");
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      setBulkDeleteModalOpen(true);
    }
  };

  const handleConfirmBulkDelete = () => {
    if (selectedIds.length === 0) {
      setBulkDeleteModalOpen(false);
      return;
    }
    setProperties(prev => prev.filter(prop => !selectedIds.includes(prop.id)));
    setSelectedIds([]);
    setBulkDeleteModalOpen(false);
    toast.success("Propiedades eliminadas", "Las propiedades seleccionadas fueron eliminadas.");
  };

  const currentPropertyDeal = useMemo(() => mapPropertyToModal(selectedProperty), [selectedProperty]);

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Button
            variant="primary"
            onClick={handleAddProperty}
            icon="plus"
          >
            Añadir nueva propiedad
          </Button>
          {selectedIds.length > 0 && (
            <Button
            variant="dangerSoft"
            size="medium"
              onClick={handleBulkDelete}
            >
              Eliminar ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.whiteCard}>
          <PropertyTabs
            activeTab={activo}
            onTabChange={setActivo}
            tabs={pestañas}
          />

          <div className={styles.contenido}>
            {hasData ? (
              <PropertiesDataTable
                data={filteredProperties}
                onRowClick={handleViewProperty}
                onEdit={handleEditProperty}
                onDelete={handleDeleteProperty}
                onView={handleViewProperty}
                selectedIds={selectedIds}
                onSelectionChange={handleSelectionChange}
              />
            ) : (
              <div className={styles.emptyState}>
                {activo === "fuera" && (
                  <>
                    <House size={48} className={styles.emptyIcon} />
                    <h3 className={styles.emptyTitle}>Propiedades fuera de mercado</h3>
                    <p className={styles.emptyDescription}>
                      No hay propiedades fuera de mercado en este momento.
                    </p>
                  </>
                )}
                {activo === "borrador" && (
                  <>
                    <FileText size={48} className={styles.emptyIcon} />
                    <h3 className={styles.emptyTitle}>Propiedades en borrador</h3>
                    <p className={styles.emptyDescription}>
                      No hay propiedades en borrador en este momento.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ViewDealModal
        deal={currentPropertyDeal}
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedProperty(null);
        }}
        entityType="property"
      />

      <DealModal
        deal={modalMode === "create" ? null : currentPropertyDeal}
        isOpen={propertyModalOpen}
        onClose={handlePropertyModalClose}
        onSave={handlePropertyModalSave}
        mode={modalMode}
        entityType="property"
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPropertyToDelete(null);
        }}
        onConfirm={() => handleConfirmDelete(propertyToDelete?.id)}
        title="Eliminar propiedad"
        message={propertyToDelete ? `¿Seguro que deseas eliminar la propiedad ${propertyToDelete.address}?` : ""}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Eliminar propiedades seleccionadas"
        message={
          selectedIds.length > 0
            ? `¿Seguro que deseas eliminar ${selectedIds.length} propiedad${selectedIds.length > 1 ? "es" : ""} seleccionada${selectedIds.length > 1 ? "s" : ""}?`
            : ""
        }
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default PropertiesPage;
