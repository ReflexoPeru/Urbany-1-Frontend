import React from 'react';
import IntegrationAccordion from '../components/IntegrationAccordion/IntegrationAccordion';

const Networks = () => {

  const networksFeatures = [
    "Elige en que redes compartir tus propiedades.",
    "Comparte fichas entre colegas.",
    "Las fichas de otra propiedad con tus datos.",
    "Asigna comisiones propias para cada propiedad."
  ];

  const urbanyNetworkFeatures = [
    "Administre sus propiedades en la red y qué hacer al cargar una nueva"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#3B82F6" />
              <circle cx="12" cy="9" r="2" fill="#ffffff" />
              <path d="M3 21h18v2H3v-2z" fill="#6B7280" />
              <path d="M9 19h6v2H9v-2z" fill="#6B7280" />
              <path d="M11 17h2v2h-2v-2z" fill="#6B7280" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              lineHeight: '1.3'
            }}>
              Redes inmobiliarias
            </h2>

            <p style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              Obten un mayor alcance y concreta más negocios a través de las redes inmobiliarias.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {networksFeatures.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#8b5cf6',
                    borderRadius: '1px',
                    marginTop: '8px',
                    flexShrink: 0
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1px' }}>
        <h3 style={{
          margin: '0 0 1px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827'
        }}>
          Red Urbany
        </h3>
      </div>

      <IntegrationAccordion
        title="Administre sus propiedades en la red y qué hacer al cargar una nueva"
        description=""
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L16 12L8 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4L12 12L4 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          marginTop: '8px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '16px' }}>
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

          <h4 style={{
            margin: '0 0 6px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827'
          }}>
            Aun no has recibido invitaciones
          </h4>

          <p style={{
            margin: '0 0 16px 0',
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.5'
          }}>
            También puedes crear una red e invitar colegas
          </p>

          <button style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease-in-out'
          }}>
            Crear red inmobiliaria
          </button>
        </div>
      </IntegrationAccordion>
    </div>
  );
};

export default Networks;