import React from 'react';
import { integrationsData } from '../../../../mock/integrations';
import IntegrationAccordion from '../../components/IntegrationAccordion/IntegrationAccordion';
import styles from './Networks.module.css';

const Networks = () => {
  const { networks } = integrationsData;

  return (
    <div className={styles.container}>
      <div className={styles.networksCard}>
        <div className={styles.networksHeader}>
          <div className={styles.networksIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#3B82F6" />
              <circle cx="12" cy="9" r="2" fill="#ffffff" />
              <path d="M3 21h18v2H3v-2z" fill="#6B7280" />
              <path d="M9 19h6v2H9v-2z" fill="#6B7280" />
              <path d="M11 17h2v2h-2v-2z" fill="#6B7280" />
            </svg>
          </div>
          <div className={styles.networksContent}>
            <h2 className={styles.networksTitle}>
              {networks.title}
            </h2>

            <p className={styles.networksDescription}>
              {networks.description}
            </p>

            <div className={styles.featuresList}>
              {networks.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureBullet}></div>
                  <span className={styles.featureText}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.urbanySection}>
        <h3 className={styles.urbanyTitle}>
          {networks.urbanyNetwork.title}
        </h3>
      </div>

      <IntegrationAccordion
        title={networks.urbanyNetwork.description}
        description=""
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L16 12L8 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4L12 12L4 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <div className={styles.accordionContent}>
          <div className={styles.accordionIcon}>
            <svg width="120" height="90" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="160" height="110" rx="8" fill="#3B82F6" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
              <circle cx="80" cy="50" r="8" fill="#ffffff" />
              <path d="M40 80C40 85 45 90 50 90C55 90 60 85 60 80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <rect x="30" y="100" width="140" height="20" rx="4" fill="#ffffff" />
              <circle cx="40" cy="110" r="3" fill="#3B82F6" />
              <path d="M20 20L180 20M20 130L180 130" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <path d="M30 30L170 30M30 120L170 120" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h4 className={styles.accordionTitle}>
            Aun no has recibido invitaciones
          </h4>

          <p className={styles.accordionDescription}>
            También puedes crear una red e invitar colegas
          </p>

          <button className={styles.accordionButton}>
            Crear red inmobiliaria
          </button>
        </div>
      </IntegrationAccordion>
    </div>
  );
};

export default Networks;