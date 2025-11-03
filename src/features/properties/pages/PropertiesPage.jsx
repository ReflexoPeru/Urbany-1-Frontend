import React, { useState, useMemo } from "react";
import { Plus, Folder, Wrench, Prohibit, CurrencyDollar, HouseSimple, FileText, House } from "phosphor-react";
import Button from "../../../components/ui/Button/Button";
import PropertiesDataTable from "../components/PropertiesDataTable";
import PropertyTabs from "../components/PropertyTabs";
import { mockProperties } from "../data/mockProperties";
import styles from "./PropertiesPage.module.css";

const PropertiesPage = () => {
  const [activo, setActivo] = useState("activas");

  // Calcular contadores para cada estado
  const counts = useMemo(() => {
    return {
      activas: mockProperties.filter(prop => prop.status === "active").length,
      reservadas: mockProperties.filter(prop => prop.status === "reserved").length,
      fuera: mockProperties.filter(prop => prop.status === "off-market" || prop.status === "inactive").length,
      vendidas: mockProperties.filter(prop => prop.status === "sold").length,
      alquiladas: mockProperties.filter(prop => prop.status === "rented").length,
      borrador: mockProperties.filter(prop => prop.status === "draft").length,
    };
  }, []);

  const pestañas = [
    { id: "activas", label: "Activas", icon: Folder, count: counts.activas },
    { id: "reservadas", label: "Reservadas", icon: Wrench, count: counts.reservadas },
    { id: "fuera", label: "Fuera de mercado", icon: Prohibit, count: counts.fuera },
    { id: "vendidas", label: "Vendidas", icon: CurrencyDollar, count: counts.vendidas },
    { id: "alquiladas", label: "Alquiladas", icon: HouseSimple, count: counts.alquiladas },
    { id: "borrador", label: "En borrador", icon: FileText, count: counts.borrador },
  ];

  // Filtrar propiedades según la pestaña activa
  const getFilteredProperties = () => {
    switch (activo) {
      case "activas":
        return mockProperties.filter(prop => prop.status === "active");
      case "reservadas":
        return mockProperties.filter(prop => prop.status === "reserved");
      case "vendidas":
        return mockProperties.filter(prop => prop.status === "sold");
      case "alquiladas":
        return mockProperties.filter(prop => prop.status === "rented");
      case "fuera":
        return mockProperties.filter(prop => prop.status === "off-market" || prop.status === "inactive");
      case "borrador":
        return mockProperties.filter(prop => prop.status === "draft");
      default:
        return [];
    }
  };

  // Handlers para las acciones de la tabla
  const handleRowClick = (property) => {
    console.log("Ver propiedad:", property);
  };

  const handleEdit = (property) => {
    console.log("Editar propiedad:", property);
  };

  const handleDelete = (property) => {
    console.log("Eliminar propiedad:", property);
  };

  const handleView = (property) => {
    console.log("Ver detalles de propiedad:", property);
  };

  const handleAddProperty = () => {
    console.log("Añadir nueva propiedad");
  };

  const filteredProperties = getFilteredProperties();
  const hasData = filteredProperties.length > 0;

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
                onRowClick={handleRowClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
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
    </div>
  );
};

export default PropertiesPage;
