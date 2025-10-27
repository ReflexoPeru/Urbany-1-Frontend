import React from 'react';
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
        <div style={{ flex: 1 }}>
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
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>Antes de comenzar</h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '16px', margin: '0 0 16px 0', color: '#6b7280', fontSize: '12px', lineHeight: '1.4' }}>
              {infoTexts.map((text, index) => (
                <li key={index} style={{ marginBottom: '6px' }}>{text}</li>
              ))}
            </ul>
          </div>
        )}

        {actionText && (
          <div className={styles.actionSection}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <button className={styles.connectButton}>
                {actionText}
              </button>
              {buttonText && (
                <button className={styles.connectButton}>
                  {buttonText}
                </button>
              )}
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, textDecoration: 'underline', cursor: 'pointer' }}>
              Conoce nuestras políticas de privacidad
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaticCard;

