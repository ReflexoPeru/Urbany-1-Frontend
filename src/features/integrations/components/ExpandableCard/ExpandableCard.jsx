import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import styles from './ExpandableCard.module.css';

const ExpandableCard = ({ title, description, icon, features, infoTexts, actionText, buttonText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>{icon}</div>
        </div>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.arrow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.content}>
          {features && (
            <>
              <h3 className={styles.subtitle}>Tu nuevo aliado inmobiliario puede ayudarte a:</h3>
              <ul className={styles.featuresList}>
                {features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <div className={styles.bullet}></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {infoTexts && (
            <div className={styles.infoSection}>
              <h4 className={styles.infoTitle}>Antes de comenzar</h4>
              <ul className={styles.infoList}>
                {infoTexts.map((text, index) => (
                  <li key={index} className={styles.infoListItem}>{text}</li>
                ))}
              </ul>
            </div>
          )}

          {actionText && (
            <div className={styles.actionSection}>
              {actionText === 'Correo electrónico' ? (
                <div className={styles.emailBlock}>
                  <label className={styles.emailLabel}>{actionText}</label>
                  <div className={styles.emailWrapper}>
                    <div className={styles.emailIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" fill="none" />
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder={buttonText || 'example@gmail.com'}
                      className={styles.emailInput}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.actionButtons}>
                  <Button variant="primary" size="small" className={styles.connectButton}>
                    {actionText}
                  </Button>
                  <Button variant="secondary" size="small" className={styles.connectButton}>
                    Conectar cuentas de los agentes con Facebook
                  </Button>
                </div>
              )}
              <button type="button" className={styles.privacyLink}>
                Conoce nuestras políticas de privacidad
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;

