// src/components/Propiedades/TablaPropiedades.jsx
import React from "react";
import { MagnifyingGlass, MapPin, Funnel, SlidersHorizontal, CaretLeft, CaretRight } from "@phosphor-icons/react";
import styles from "../pages/propiedades.module.css";

const TablaPropiedades = () => {
  return (
    <div>
      <div className={styles.tablaContainer}>
        <table className={styles.tablaPropiedades}>
          <thead>
            <tr>
              <th>FOTO</th>
              <th>DIRECCIÓN</th>
              <th>CALIDAD</th>
              <th>TIPO</th>
              <th>PRECIO</th>
              <th>PORTALES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.foto}>
                <img src="./public/Imgtabla1.jpg" alt="Propiedad" />
              </td>
              <td>Calle del Sol, 123, Ciudad</td>
              <td className={styles.calidad}>
                <div className={styles.barraCalidad}>
                  <div className={styles.barraContainer}>
                    <div className={styles.barraRelleno} style={{ width: "80%" }}></div>
                  </div>
                  80
                </div>
              </td>
              <td className={styles.tipo}>Apartamento</td>
              <td className={styles.precio}>$250.000</td>
              <td className={styles.portales}>
                <p>Idealista</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TablaPropiedades;
