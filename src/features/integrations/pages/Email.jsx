import { useState } from 'react';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';

const Email = () => {
  const [activeCategory, setActiveCategory] = useState('email');

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
          <div style={{ 
            background: '#ffffff',
            borderRadius: '12px',
            padding: '32px',
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
              Integración de correo electrónico
            </h2>
            
            <p style={{ 
              margin: '0 0 24px 0', 
              fontSize: '16px', 
              color: '#6b7280', 
              lineHeight: '1.5'
            }}>
              Pero primero debe estar tu web configurada. ¿Qué podré hacer una vez que tenga mi cuenta creada?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                  Sincronizar los correos de urbany con tu cuenta de email profesional
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                  Difundir tus propiedades por email
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                  Efectuar seguimiento de las aperturas de correo
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                  Ahorrar tiempo usando plantillas personalizables
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                  Personalizar tu firma para tener una apariencia más profesional
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', fontWeight: '500' }}>
                  Comparte tu disponibilidad con tus compañeros de trabajo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollableContainer>
  );
};

export default Email;