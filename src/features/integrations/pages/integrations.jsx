import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';

const Integrations = () => {
  const [selectedCategory, setSelectedCategory] = useState('portales');
  const location = useLocation();

  // Detectar categoría activa basada en la ruta actual
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes('/portals')) {
      setSelectedCategory('portales');
    } else if (currentPath.includes('/calendar')) {
      setSelectedCategory('calendario');
    } else if (currentPath.includes('/social-media')) {
      setSelectedCategory('instagram-whatsapp');
    } else if (currentPath.includes('/hoomi')) {
      setSelectedCategory('hoomi');
    } else if (currentPath.includes('/email')) {
      setSelectedCategory('email');
    } else if (currentPath.includes('/networks')) {
      setSelectedCategory('redes-inmobiliarias');
    } else if (currentPath.includes('/marketing')) {
      setSelectedCategory('marketing');
    } else if (currentPath.includes('/emailMarketing')) {
      setSelectedCategory('email-marketing');
    }
  }, [location.pathname]);

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
          <Outlet />
        </div>
      </div>
    </ScrollableContainer>
  );
};

export default Integrations;
