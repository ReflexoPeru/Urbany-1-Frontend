import React from 'react';
import Button from '../../../../components/ui/Button';

const Calendar = () => {
  return (
    <div style={{ marginLeft: '12px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#123429', margin: '0 0 12px 0' }}>
          Sincronización de calendario
        </h3>
        <p style={{ fontSize: '14px', color: '#58786f', margin: '0 0 2px 0' }}>
          Visualizá todas tus actividades en un sólo lugar
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '16px' }}>
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#58786f', fontSize: '14px', lineHeight: '1.5' }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px', whiteSpace: 'nowrap' }}>
                <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '1px', marginTop: '6px', flexShrink: 0 }}></div>
                <span>Ya no cambiarás entre Urbany y tu calendario de Google</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px', whiteSpace: 'nowrap' }}>
                <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '1px', marginTop: '6px', flexShrink: 0 }}></div>
                <span>No te olvides de ninguna actividad</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', whiteSpace: 'nowrap' }}>
                <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '1px', marginTop: '6px', flexShrink: 0 }}></div>
                <span>Comparte tu disponibilidad con tus compañeros de trabajo</span>
              </li>
            </ul>
          </div>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', marginTop: '-60px' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2" fill="none" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="8" cy="14" r="1" fill="white" />
              <circle cx="12" cy="14" r="1" fill="white" />
              <circle cx="16" cy="14" r="1" fill="white" />
              <circle cx="8" cy="18" r="1" fill="white" />
              <circle cx="12" cy="18" r="1" fill="white" />
            </svg>
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              width: '30px',
              height: '30px',
              background: '#f0fdf4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#10B981" />
              </svg>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#58786f', margin: '0 0 16px 0', lineHeight: '1.4' }}>
          Sincroniza tus eventos en Urbany con el proveedor número uno: Google Calendar
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" size="small">
            Añadir cuenta nueva
          </Button>
          <Button
            variant="secondary"
            size="small"
            style={{
              background: '#ecfdf5',
              border: '1px solid #bbf7d0',
              color: '#047857',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            ¿Cómo funciona?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;