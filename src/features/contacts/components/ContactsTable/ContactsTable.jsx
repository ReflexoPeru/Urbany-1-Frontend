// src/features/contacts/components/ContactsTable/ContactsTable.jsx
import React from 'react';
import styles from './ContactsTable.module.css';

const ContactsTable = ({ contacts, loading }) => {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.skeletonHeader}></div>
        <div className={styles.skeletonRow}></div>
        <div className={styles.skeletonRow}></div>
        <div className={styles.skeletonRow}></div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return <div className={styles.emptyState}>No se encontraron contactos.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className={styles.contactName}>{contact.name}</td>
              <td>{contact.email}</td>
              <td>
                <span className={`${styles.contactType} ${styles[contact.type.toLowerCase()]}`}>
                  {contact.type}
                </span>
              </td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;