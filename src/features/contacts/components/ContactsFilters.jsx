import React, { useState } from 'react';
import { MagnifyingGlass, Download, PlusCircle } from "phosphor-react";
import { Select } from '../../../components/common/Select';
import styles from '../pages/ContactsPage.module.css';

const ContactsFilters = ({ showTable, onToggleTable }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // Opciones para los selects
  const agentOptions = [
    { value: 'all', label: 'Todos los agentes' },
    { value: 'agent1', label: 'Agente 1' },
    { value: 'agent2', label: 'Agente 2' },
    { value: 'agent3', label: 'Agente 3' },
  ];

  const typeOptions = [
    { value: 'all', label: 'Todos los contactos' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'proveedor', label: 'Proveedores' },
  ];

  const tagOptions = [
    { value: 'all', label: 'Todas las etiquetas' },
    { value: 'important', label: 'Importantes' },
    { value: 'frequent', label: 'Frecuentes' },
    { value: 'new', label: 'Nuevos' },
  ];

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
        <button className={styles.addButton}>
          <PlusCircle size={20} weight="bold" /> Añadir nuevo contacto
        </button>
      </div>

      <div className={styles.dropdownRow}>
        <div className={styles.dropdownFilters}>
          <Select
            options={agentOptions}
            value={selectedAgent}
            onChange={setSelectedAgent}
            placeholder="Agente"
            isClearable={true}
            className={styles.filterSelect}
          />
          <Select
            options={typeOptions}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Tipo de contacto"
            isClearable={true}
            className={styles.filterSelect}
          />
          <Select
            options={tagOptions}
            value={selectedTag}
            onChange={setSelectedTag}
            placeholder="Etiquetas"
            isClearable={true}
            className={styles.filterSelect}
          />
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
