import React from 'react';
import Button from '../../../../components/ui/Button';
import styles from './StaticCard.module.css';

const StaticCard = ({ title, description, icon, features, infoTexts, actionText, buttonText }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            {icon}
          </div>
        </div>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

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
            <div className={styles.actionButtons}>
              <Button variant="success" size="small" className={`${styles.connectButton} ${styles.primaryButton}`}>
                {actionText}
              </Button>
              {buttonText && (
                <Button variant="secondary" size="small" className={`${styles.connectButton} ${styles.secondaryButton}`}>
                  {buttonText}
                </Button>
              )}
            </div>
            <button type="button" className={styles.privacyLink}>
              Conoce nuestras políticas de privacidad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaticCard;

