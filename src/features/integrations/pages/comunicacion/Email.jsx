import React from 'react';
import { integrationsData } from '../../../../mock/integrations';
import styles from './Email.module.css';

const Email = () => {
  const { email } = integrationsData;

  return (
    <div className={styles.container}>
      <div className={styles.emailHeader}>
        <div className={styles.emailIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#3B82F6" />
            <path d="M22 6l-10 7L2 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" fill="#ffffff" />
          </svg>
        </div>
        <div className={styles.emailContent}>
          <h2 className={styles.title}>
            {email.title}
          </h2>

          <p className={styles.description}>
            {email.description}
          </p>
        </div>
      </div>

      <div className={styles.featuresList}>
        {email.features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.checkIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10b981" />
                <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.featureText}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Email;