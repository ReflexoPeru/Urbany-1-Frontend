// src/features/contacts/pages/ContactsPage.jsx
import React, { useState, useMemo } from 'react';
import DataTable from '../../../components/common/DataTable';
import ContactsHeader from '../components/ContactsHeader';
import ContactsFilters from '../components/ContactsFilters';
import { mockContacts } from '../../../mock/contacts';
import { Envelope, Phone, PencilSimple, Trash, WhatsappLogo } from 'phosphor-react';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const [showTable, setShowTable] = useState(true); // Mostrar tabla por defecto
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Función para obtener iniciales del nombre
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Definición de columnas
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'NOMBRE',
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className={styles.contactCell}>
            <div className={styles.avatarContainer}>
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {getInitials(contact.name)}
                </div>
              )}
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.contactName}>{contact.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'CORREO',
      cell: ({ row }) => (
        <div className={styles.emailCell}>
          <Envelope size={14} className={styles.emailIcon} />
          <span>{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'TIPO',
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <span className={`${styles.typeTag} ${styles[type.toLowerCase()]}`}>
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'TELÉFONO',
      cell: ({ row }) => (
        <div className={styles.phoneCell}>
          <Phone size={14} className={styles.phoneIcon} />
          <span>{row.original.phone}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'ACCIONES',
      cell: ({ row }) => (
        <div className={styles.actionsContainer}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row.original);
            }}
            className={styles.actionButton}
            title="Editar"
          >
            <PencilSimple size={16} weight="bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.original);
            }}
            className={styles.actionButton}
            title="Eliminar"
          >
            <Trash size={16} weight="bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Abrir WhatsApp
              const phoneNumber = row.original.phone.replace(/[^0-9]/g, '');
              window.open(`https://wa.me/${phoneNumber}`, '_blank');
            }}
            className={styles.actionButton}
            title="Contactar por WhatsApp"
          >
            <WhatsappLogo size={16} weight="bold" />
          </button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 120,
    },
  ], []);

  // Handlers para las acciones de la tabla
  const handleRowClick = (contact) => {
    console.log("Ver contacto:", contact);
  };

  const handleEdit = (contact) => {
    console.log("Editar contacto:", contact);
  };

  const handleDelete = (contact) => {
    console.log("Eliminar contacto:", contact);
  };

  const handleView = (contact) => {
    console.log("Ver detalles de contacto:", contact);
  };

  return (
    <div className={styles.contactsContent}>
      <ContactsHeader />
      <ContactsFilters
        showTable={showTable}
        onToggleTable={() => setShowTable(!showTable)}
      />

      {/* Área de la tabla */}
      <div className={styles.tableArea}>
        {showTable && (
          <DataTable
            data={mockContacts}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            enableRowSelection={true}
            enableSorting={true}
            enableMultiSort={false}
            enableColumnFilters={false}
            enableGlobalFilter={false}
            enablePagination={true}
            pageSize={10}
            enableRowHover={true}
            className={styles.dataTable}
          />
        )}
      </div>
    </div>
  );
};

export default ContactsPage;