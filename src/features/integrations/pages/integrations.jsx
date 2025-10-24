import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';

const Integrations = () => {
  const [selectedCategory, setSelectedCategory] = useState('portales');
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'portales') {
      navigate('/portals');
    } else if (categoryId === 'calendario') {
      navigate('/calendar');
    } else if (categoryId === 'instagram-whatsapp') {
      navigate('/social-media');
    } else if (categoryId === 'hoomi') {
      navigate('/hoomi');
    } else if (categoryId === 'email') {
      navigate('/email');
    } else if (categoryId === 'networks') {
      navigate('/networks');
    } else if (categoryId === 'marketing') {
      navigate('/marketing');
    }
  };

  return (
    <ScrollableContainer>
      <div style={{ marginBottom: '32px', marginLeft: '0px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Integraciones
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 24px 0' }}>
          Seleccione una categoría de integración para comenzar
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <IntegrationSidebar activeCategory={selectedCategory} />

        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '400px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                Seleccione una categoría
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Elija una categoría del menú lateral para ver las integraciones disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollableContainer>
  );
};

export default Integrations;
