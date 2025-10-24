import React from 'react';

const Email = () => {
  return (
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
  );
};

export default Email;