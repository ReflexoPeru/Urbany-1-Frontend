// src/features/contacts/pages/ContactsPage.jsx
import React, { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import ContactsTable from '../components/ContactsTable/ContactsTable';
import ContactsHeader from '../components/ContactsHeader';
import ContactsFilters from '../components/ContactsFilters';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const { contacts, loading } = useContacts();
  const [showTable, setShowTable] = useState(false);

  return (
    <div className={styles.contactsContent}>
      <ContactsHeader />
      <ContactsFilters 
        showTable={showTable} 
        onToggleTable={() => setShowTable(!showTable)} 
      />

      {/* Área de la tabla */}
      <div className={styles.tableArea}>
        {showTable && <ContactsTable contacts={contacts} loading={loading} />}
      </div>
    </div>
  );
};

export default ContactsPage;