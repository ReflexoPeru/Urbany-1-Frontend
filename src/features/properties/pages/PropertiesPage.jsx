import React, { useState } from "react";
import styles from "./PropertiesPage.module.css";
import PropertiesDataTable from "../components/PropertiesDataTable";
import PropertyTabs from "../components/PropertyTabs";
import { mockProperties } from "../data/mockProperties";
import { PlusCircle } from "phosphor-react";

const PropertiesPage = () => {
  const [activo, setActivo] = useState("activas");

  const pestañas = [
    { id: "activas", label: "Activas" },
    { id: "reservadas", label: "Reservadas" },
    { id: "fuera", label: "Fuera de mercado" },
    { id: "vendidas", label: "Vendidas" },
    { id: "alquiladas", label: "Alquiladas" },
    { id: "borrador", label: "En borrador" },
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


  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Propiedades</h1>
        <button className={styles.addButton}>
          <PlusCircle size={20} weight="bold" /> Añadir nueva propiedad
        </button>
      </div>

      <PropertyTabs
        activeTab={activo}
        onTabChange={setActivo}
        tabs={pestañas}
      />

      <div className={styles.contenido}>
        {activo === "activas" && (
          <PropertiesDataTable
            data={getFilteredProperties()}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
        {activo === "reservadas" && (
          <PropertiesDataTable
            data={getFilteredProperties()}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
        {activo === "vendidas" && (
          <PropertiesDataTable
            data={getFilteredProperties()}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
        {activo === "alquiladas" && (
          <PropertiesDataTable
            data={getFilteredProperties()}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
        {activo === "fuera" && <p>🏠 Propiedades fuera de mercado.</p>}
        {activo === "borrador" && <p>📝 Propiedades en borrador.</p>}
      </div>
    </div>
  );
};

export default PropertiesPage;
