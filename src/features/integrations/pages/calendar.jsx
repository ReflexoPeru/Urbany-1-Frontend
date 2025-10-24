import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';

const ExpandableCard = ({ id, title, description, icon, iconColor, isExpanded, onToggle, children }) => {
  return (
    <div>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb', cursor: 'pointer', minHeight: '60px', transition: 'all 0.2s ease' }}
        onClick={() => onToggle(id)}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
          <div style={{ width: '20px', height: '20px', background: iconColor, borderRadius: '4px' }}></div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{title}</h3>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>{description}</p>
        </div>
        <div style={{ 
          width: '16px', 
          height: '16px', 
          background: '#9ca3af', 
          clipPath: isExpanded ? 'polygon(0 0, 100% 0, 50% 100%)' : 'polygon(0 0, 100% 50%, 0 100%)',
          transition: 'clip-path 0.2s ease'
        }}></div>
      </div>
      
      {isExpanded && (
        <div style={{ marginTop: '8px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const Calendar = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('calendario');
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'portales') {
      navigate('/integrations');
    } else if (categoryId === 'instagram-whatsapp') {
      navigate('/social-media');
    } else if (categoryId === 'hoomi') {
      navigate('/hoomi');
    }
  };

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

      <div style={{ display: 'flex', gap: '40px' }}>
        <IntegrationSidebar activeCategory={selectedCategory} />

        <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
                Sincronización de calendario
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2px 0' }}>
                Visualizá todas tus actividades en un sólo lugar
              </p>
            
             <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '16px' }}>
               <div style={{ flex: 1, maxWidth: '400px' }}>
                 <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 0', color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
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
                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2" fill="none"/>
                   <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                   <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                   <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                   <circle cx="8" cy="14" r="1" fill="white"/>
                   <circle cx="12" cy="14" r="1" fill="white"/>
                   <circle cx="16" cy="14" r="1" fill="white"/>
                   <circle cx="8" cy="18" r="1" fill="white"/>
                   <circle cx="12" cy="18" r="1" fill="white"/>
                 </svg>
                 <div style={{ 
                   position: 'absolute', 
                   bottom: '8px', 
                   right: '8px', 
                   width: '30px', 
                   height: '30px', 
                   background: '#10B981', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   border: '3px solid white'
                 }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                   </svg>
                 </div>
               </div>
             </div>
            
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 16px 0', lineHeight: '1.4' }}>
              Sincroniza tus eventos en Urbany con el proveedor número uno: Google Calendar
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
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
                Añadir cuenta nueva
              </button>
              <button style={{ 
                padding: '12px 24px', 
                background: 'white', 
                color: '#3B82F6', 
                border: '1px solid #3B82F6', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontWeight: '600', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#3B82F6';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#3B82F6';
              }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
                ¿Cómo funciona?
              </button>
            </div>
          </div>
        </div>
      </div>
        </ScrollableContainer>
      );
    };

    export default Calendar;
