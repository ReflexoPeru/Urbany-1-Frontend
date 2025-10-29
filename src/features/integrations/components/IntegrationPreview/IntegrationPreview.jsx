import React from 'react';

const IntegrationPreview = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px',
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '400px',
        padding: '40px 20px'
      }}>
        <div style={{
          marginBottom: '24px',
          opacity: '0.6'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#d1d5db" strokeWidth="2" fill="none"/>
            <path d="M8 8h8v2H8V8z" stroke="#d1d5db" strokeWidth="2" fill="none"/>
            <path d="M8 12h8v2H8v-2z" stroke="#d1d5db" strokeWidth="2" fill="none"/>
            <path d="M8 16h4v2H8v-2z" stroke="#d1d5db" strokeWidth="2" fill="none"/>
            <circle cx="6" cy="6" r="1" fill="#d1d5db"/>
          </svg>
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Seleccione una categoría
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0',
          lineHeight: '1.5',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Elija una categoría del menú lateral para ver las integraciones disponibles
        </p>
      </div>
    </div>
  );
};

export default IntegrationPreview;
