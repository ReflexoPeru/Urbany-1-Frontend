// src/features/contacts/pages/ContactsPage.jsx
import React, { useState } from 'react';
import { Download, MagnifyingGlass, CaretDown } from "phosphor-react";
import { useContacts } from '../hooks/useContacts';
import ContactsTable from '../components/ContactsTable/ContactsTable';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const { contacts, loading } = useContacts();
  const [showTable, setShowTable] = useState(false);

  return (
    <div className={`${styles.contactsContainer} ${showTable ? styles.withTable : styles.withoutTable}`}>
      <div className={styles.contactsContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Contactos</h1>
          <button className={styles.addButton}>
            + Añadir nuevo contacto
          </button>
        </div>

        {/* Filtros superiores */}
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

          {/* Botón de descarga */}
          <div className={styles.toggleSection}>
            <button 
              className={`${styles.toggleButton} ${showTable ? styles.withTable : styles.withoutTable}`}
              onClick={() => setShowTable(!showTable)}
              title={showTable ? "Ocultar lista" : "Mostrar lista"}
            >
              <Download size={20} weight="regular" />
            </button>
          </div>
        </div>

        {/* Área de la tabla */}
        <div className={styles.tableArea}>
          {showTable && <ContactsTable contacts={contacts} loading={loading} />}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;