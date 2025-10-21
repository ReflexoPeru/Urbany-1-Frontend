import React from 'react';
import { MagnifyingGlass, CaretDown, Download } from "@phosphor-icons/react";
import styles from '../pages/ContactsPage.module.css';

const ContactsFilters = ({ showTable, onToggleTable }) => {
  return (
    <div className={styles.filtersSection}>
      <div className={styles.searchFilter}>
        <div className={styles.searchWrapper}>
          <MagnifyingGlass size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Filtrar por nombre, email o teléfono"
            className={styles.searchInput}
          />
        </div>
      </div>
      
      <div className={styles.dropdownRow}>
        <div className={styles.dropdownFilters}>
          <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown}>
              <option>Agente</option>
              <option>Agente 1</option>
              <option>Agente 2</option>
            </select>
            <CaretDown size={16} className={styles.dropdownArrow} />
          </div>
          <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown}>
              <option>Todos los contactos</option>
              <option>Clientes</option>
              <option>Proveedores</option>
            </select>
            <CaretDown size={16} className={styles.dropdownArrow} />
          </div>
          <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown}>
              <option>Etiquetas</option>
              <option>Importantes</option>
              <option>Frecuentes</option>
            </select>
            <CaretDown size={16} className={styles.dropdownArrow} />
          </div>
        </div>
      </div>

      <div className={styles.toggleSection}>
        <button 
          className={`${styles.toggleButton} ${showTable ? styles.withTable : styles.withoutTable}`}
          onClick={onToggleTable}
          title={showTable ? "Ocultar lista" : "Mostrar lista"}
        >
          <Download size={20} weight="regular" />
        </button>
      </div>
    </div>
  );
};

export default ContactsFilters;
