import { useState } from 'react';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';
import IntegrationAccordion from '../components/IntegrationAccordion/IntegrationAccordion';

const EmailMarketing = () => {
  const [activeCategory, setActiveCategory] = useState('email-marketing');

  return (
    <ScrollableContainer>
      <div style={{ marginBottom: '32px', marginLeft: '0px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Integraciones
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 24px 0' }}>
          Realice las diferentes integraciones para incrementar su efectividad
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <IntegrationSidebar activeCategory={activeCategory} />

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#111827'
            }}>
              Herramientas
            </h3>
          </div>
          
          <IntegrationAccordion
            title="MyPerfit"
            description="Administre sus propiedades en la red y qué hacer al cargar una nueva"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 10L9 21l-5-5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 14L9 25l-5-5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="2"/>
              </svg>
            }
          >
            <div style={{ 
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              marginTop: '16px'
            }}>
              <h4 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827'
              }}>
                Integración con MyPerfit
              </h4>
              
              <p style={{ 
                margin: '0 0 24px 0', 
                fontSize: '16px', 
                color: '#6b7280', 
                lineHeight: '1.5'
              }}>
                Conecta con tu cuenta de MyPerfit para poder sincronizar los contactos y crear listas.
              </p>

              <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
                <label htmlFor="apiKey" style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  API Key
                </label>
                <input
                  type="text"
                  id="apiKey"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    color: '#111827',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px', maxWidth: '300px' }}>
                <label htmlFor="cuenta" style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Cuenta
                </label>
                <input
                  type="text"
                  id="cuenta"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    color: '#111827',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out'
              }}>
                Guardar Configuración
              </button>
            </div>
          </IntegrationAccordion>
        </div>
      </div>
    </ScrollableContainer>
  );
};

export default EmailMarketing;
