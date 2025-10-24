import React from 'react';
import IntegrationAccordion from '../components/IntegrationAccordion/IntegrationAccordion';

const EmailMarketing = () => {
  return (
    <div>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          margin: '0 0 16px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#111827',
          lineHeight: '1.3'
        }}>
          Email Marketing
        </h2>

        <p style={{
          margin: '0 0 24px 0',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.5'
        }}>
          Configure sus campañas de email marketing para llegar a más clientes.
        </p>

        <IntegrationAccordion
          title="Mailchimp"
          description="Integre Mailchimp para crear y gestionar campañas de email marketing."
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#FFE01B" />
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
            <h4 style={{
              margin: '0 0 6px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              Configurar Mailchimp
            </h4>

            <p style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              Conecte su cuenta de Mailchimp para comenzar a crear campañas
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
              Conectar Mailchimp
            </button>
          </div>
        </IntegrationAccordion>
      </div>
    </div>
  );
};

export default EmailMarketing;