import React, { useState } from 'react';
import styles from './IntegrationAccordion.module.css';

const IntegrationAccordion = ({ title, description, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <button className={styles['accordion-header']} onClick={handleToggle}>
        <div className={styles['icon-container']}>
          {icon}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles['action-button']}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6L6 10L10 14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 6L18 10L14 14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles['action-text']}>Configurar</span>
        </div>
      </button>

      {isOpen && (
        <div className={styles['accordion-content']}>
          {children}
        </div>
      )}
    </div>
  );
};

export default IntegrationAccordion;

