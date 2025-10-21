import React from 'react';
import styles from '../pages/ContactsPage.module.css';

const ContactsHeader = () => {
  return (
    <div className={styles.header}>
      <button className={styles.addButton}>
        + Añadir nuevo contacto
      </button>
    </div>
  );
};

export default ContactsHeader;
