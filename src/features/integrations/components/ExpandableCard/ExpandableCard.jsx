import React, { useState } from 'react';
import styles from './ExpandableCard.module.css';

const ExpandableCard = ({ title, description, icon, features, infoTexts, actionText, buttonText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            {icon}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.arrow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
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
              {actionText === "Correo electrónico" ? (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827', 
                    marginBottom: '8px' 
                  }}>
                    {actionText}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>
                    <input 
                      type="email" 
                      placeholder={buttonText || "example@gmail.com"}
                      style={{
                        width: '300px',
                        maxWidth: '100%',
                        padding: '12px 12px 12px 40px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <button style={{ 
                    padding: '12px 24px', 
                    background: '#3B82F6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#2563EB'}
                  onMouseOut={(e) => e.target.style.background = '#3B82F6'}
                  >
                    {actionText}
                  </button>
                  <button style={{ 
                    padding: '12px 24px', 
                    background: '#3B82F6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#2563EB'}
                  onMouseOut={(e) => e.target.style.background = '#3B82F6'}
                  >
                    Conectar cuentas de los agentes con Facebook
                  </button>
                </div>
              )}
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, textDecoration: 'underline', cursor: 'pointer' }}>
                Conoce nuestras políticas de privacidad
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;

