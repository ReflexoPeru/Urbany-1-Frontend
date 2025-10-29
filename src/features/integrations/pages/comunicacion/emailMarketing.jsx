import React from 'react';
import { Check } from 'lucide-react';
import IntegrationAccordion from '../../components/IntegrationAccordion/IntegrationAccordion';

const EmailMarketing = () => {
  return (
    <div style={{ marginLeft: '12px' }}>
      <IntegrationAccordion
        title="MyPerfit"
        description="Administre sus propiedades en la red y qué hacer al cargar una nueva"
        icon={
          <div style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: '#3B82F6', 
            borderRadius: '4px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Check size={16} color="white" />
          </div>
        }
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          marginTop: '16px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#111827', 
            margin: '0 0 8px 0' 
          }}>
            Integración con MyPerfit
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280', 
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            Conecta con tu cuenta de MyPerfit para poder sincronizar los contactos y crear listas.
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#111827', 
              marginBottom: '8px' 
            }}>
              API Key
            </label>
            <input 
              type="text" 
              style={{
                width: '100%',
                padding: '12px',
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
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#111827', 
              marginBottom: '8px' 
            }}>
              Cuenta
            </label>
            <input 
              type="text" 
              style={{
                width: '100%',
                padding: '12px',
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
          
          <button style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}>
            Guardar Configuración
          </button>
        </div>
      </IntegrationAccordion>
    </div>
  );
};

export default EmailMarketing;