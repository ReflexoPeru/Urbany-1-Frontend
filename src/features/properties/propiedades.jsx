import React, { useState } from "react";
import styles from "./propiedades.module.css";
import TablaPropiedades from "./components/tablaPropiedades";
import {
  PlusCircle,
  MagnifyingGlass,
  MapPin,
  Funnel,
  SlidersHorizontal,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

const Propiedades = () => {
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

      <div className={styles.tabs}>
        {pestañas.map((tab) => (
          
          <button
            key={tab.id}
            className={`${styles.tab} ${activo === tab.id ? styles.activo : ""}`}
            onClick={() => setActivo(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.contenido}>
        {activo === "activas" && 
          <div>
            
              <div className={styles.iconosAcciones}>        
                  <MagnifyingGlass size={32} />
                  <MapPin size={32} />
                  <Funnel size={32} />
                  <SlidersHorizontal size={32} />
              </div>
              <TablaPropiedades />
              <div className={styles.optionpages}>
                  <CaretLeft size={32}/>
                  <div><span>1</span> 2 3 ... 10</div>
                  <CaretRight size={32}/>
              </div>

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

export default Propiedades;
