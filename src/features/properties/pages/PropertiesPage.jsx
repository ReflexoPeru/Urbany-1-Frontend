import React, { useState } from "react";
import styles from "./PropertiesPage.module.css";
import PropertiesTable from "../components/PropertiesTable";
import PropertyTabs from "../components/PropertyTabs";
import PropertyActions from "../components/PropertyActions";
import { PlusCircle } from "@phosphor-icons/react";

const PropertiesPage = () => {
  const [activo, setActivo] = useState("activas");

  const pestañas = [
    { id: "activas", label: "Activas"},
    { id: "reservadas", label: "Reservadas"},
    { id: "fuera", label: "Fuera de mercado"},
    { id: "vendidas", label: "Vendidas"},
    { id: "alquiladas", label: "Alquiladas"},
    { id: "borrador", label: "En borrador"},
  ];


  return (
    <div className={styles.contenedor}>
      <div className={styles.encabezado}>
        <h1>Propiedades</h1>
        <button className={styles.botonAñadir}>
          <PlusCircle size={20} weight="bold" /> Añadir nueva propiedad
        </button>
      </div>

      <PropertyTabs 
        activeTab={activo} 
        onTabChange={setActivo} 
        tabs={pestañas} 
      />

      <div className={styles.contenido}>
        {activo === "activas" && 
          <div>
            <PropertyActions />
            <PropertiesTable />
          </div>
        }
        {activo === "reservadas" && <p>🏠 Propiedades reservadas.</p>}
        {activo === "fuera" && <p>🏠 Propiedades fuera de mercado.</p>}
        {activo === "vendidas" && <p>🏠 Propiedades vendidas.</p>}
        {activo === "alquiladas" && <p>🏠 Propiedades alquiladas.</p>}
        {activo === "borrador" && <p>📝 Propiedades en borrador.</p>}
      </div>
    </div>
  );
};

export default PropertiesPage;
