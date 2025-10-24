import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';
import ExpandableCard from '../components/ExpandableCard';

const SocialMedia = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('instagram-whatsapp');
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
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
              Integraciones oficiales
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExpandableCard
                title="Instagram"
                description="Integre su cuenta de Instagram Negocio y comience a publicar a través del CRM."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="4" ry="4" fill="#E4405F"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                    <circle cx="18" cy="6" r="2" fill="white"/>
                  </svg>
                }
                infoTexts={[
                  "Para poder conectar tu cuenta de Instagram primero debe estar relacionada a un negocio de Facebook.",
                  "Suena complicado pero no te preocupes, te ayudaremos en todo el proceso. En el siguiente artículo tienes todo detallado.",
                  "Una vez que lo hayas completado puedes conectar tu cuenta con el CRM desde aquí."
                ]}
                actionText="Conectar cuenta de la inmobiliaria con Facebook"
                buttonText="Conectar cuenta de la inmobiliaria con Facebook"
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
              Integración alternativa
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExpandableCard
                title="WhatsApp Business API"
                description="Integre su cuenta de Facebook Business y conecte todo el equipo a un número de WhatsApp para tener todas las conversaciones en el CRM a través de la API Oficial."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="#25D366"/>
                  </svg>
                }
              />

              <ExpandableCard
                title="WhatsApp"
                description="Integre su número de WhatsApp a su cuenta escaneando el QR para sincronizar sus conversaciones con el CRM."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="#25D366"/>
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
        </ScrollableContainer>
      );
    };

    export default SocialMedia;
