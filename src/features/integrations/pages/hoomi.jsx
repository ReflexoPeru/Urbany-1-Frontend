import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';
import StaticCard from '../components/StaticCard';
import ExpandableCard from '../components/ExpandableCard';


const Hoomi = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('hoomi');
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'portales') {
      navigate('/integrations');
    } else if (categoryId === 'calendario') {
      navigate('/calendar');
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

      <div style={{ display: 'flex', gap: '16px' }}>
        <IntegrationSidebar activeCategory={selectedCategory} />

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '15px' }}>
            <ExpandableCard
              title="Cliengo"
              description="Integre Cliengo para publicar, editar y eliminar sus inmuebles."
              icon={
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  background: '#3B82F6', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  C
                </div>
              }
            />
          </div>
          <StaticCard 
            title="Hoomi"
            description="Hoomi es un bot especializado en el sector inmobiliario, diseñado para acompañarte en la gestión diaria de tus contactos y oportunidades."
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
                <circle cx="8" cy="9" r="1.5" fill="white"/>
                <circle cx="16" cy="9" r="1.5" fill="white"/>
                <path d="M8 14c0 2.5 1.5 4 4 4s4-1.5 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            }
            features={[
              "Responder automáticamente los mensajes de WhatsApp",
              "Detectar el interés de tus clientes y sugerirles las propiedades más adecuadas",
              "Crear negocios y tasaciones directamente en el CRM",
              "Coordinar llamadas y visitas en tu agenda",
              "Mantenerte informado sobre cada avance importante"
            ]}
            infoTexts={[
              "Hoomi se conectará a tu cuenta de WhatsApp y te ayudará a gestionar solo los nuevos contactos.",
              "Recuerda no tener configurado mensajes automáticos en tu WhatsApp, sino Hoomi se desactivará en el momento que se envíen."
            ]}
            actionText="Para poder usar Hoomi, primero debes conectar tu cuenta de WhatsApp"
            buttonText="Conectar mi cuenta de WhatsApp"
          />
        </div>
      </div>
    </ScrollableContainer>
  );
};

    export default Hoomi;
