import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';
import ExpandableCard from '../components/ExpandableCard';

const Marketing = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('marketing');
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
              Email marketing
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExpandableCard
                title="Mailchimp"
                description="Integre Mailchimp para automatizar campañas de email marketing."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#FFE01B"/>
                  </svg>
                }
              />

              <ExpandableCard
                title="Constant Contact"
                description="Integre Constant Contact para gestionar campañas de email."
                icon={
                  <div style={{ width: '20px', height: '20px', background: '#FF6600', borderRadius: '4px' }}></div>
                }
              />

              <ExpandableCard
                title="HubSpot"
                description="Integre HubSpot para automatizar marketing y ventas."
                icon={
                  <div style={{ width: '20px', height: '20px', background: '#FF7A59', borderRadius: '4px' }}></div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollableContainer>
  );
};

export default Marketing;

