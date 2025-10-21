import React from 'react';
import styles from '../pages/ContactsPage.module.css';

const ContactsHeader = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Contactos</h1>
      <button className={styles.addButton}>
        + Añadir nuevo contacto
      </button>
    </div>
  );
};

export default ContactsHeader;
