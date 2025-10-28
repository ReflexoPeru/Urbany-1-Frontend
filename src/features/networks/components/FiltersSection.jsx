import React from 'react';
import styles from '../styles/FiltersSection.module.css';

const FiltersSection = () => {
  return (
    <div className={styles.filtersSection}>
      <div className={styles.searchGroup}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Dirección o código de la propiedad..."
            className={styles.searchInput}
          />
          {/* Botón movido fuera del contenedor de búsqueda */}
        </div>

        <div className={styles.bottomRow}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            Incluir mis propiedades
          </label>
          
          <button className={styles.searchButton}>
            Ver en el Mapa
          </button>
        </div>
      </div>

      {/* Fila con TODOS los botones de filtros integrados */}
      <div className={styles.filtersRow}>
        <span className={styles.filtersLabel}>Filtros:</span>
        <div className={styles.filtersContainer}>
          {/* Botones que antes estaban en subOptions */}
          <button className={styles.filterButton}>Tipo de operación</button>
          <button className={styles.filterButton}>Tipo de propiedad</button>
          {/* Botones originales de filtros */}
          <button className={styles.filterButton}>Precio</button>
          <button className={styles.filterButton}>Ubicación</button>
          <button className={styles.filterButton}>Ambientes</button>
          <button className={styles.filterButton}>Dormitorios</button>
          <button className={styles.filterButton}>Inmobiliarias</button>
          <button className={styles.filterButton}>Comisión</button>
          
          {/* Contenedor para los iconos */}
          <div className={styles.iconsContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>
    </div>
  );
};

export default FiltersSection;