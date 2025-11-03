import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';
import IntegrationPreview from '../components/IntegrationPreview/IntegrationPreview';
import styles from './integrations.module.css';

const Integrations = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

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
    } else {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>Integraciones</h1>
          <p className={styles.subtitle}>Seleccione una categoría de integración para comenzar</p>
        </header>

        <div className={styles.content}>
          <IntegrationSidebar activeCategory={selectedCategory} />

          <div className={styles.main}>
            <ScrollableContainer>
              {selectedCategory ? <Outlet /> : <IntegrationPreview />}
            </ScrollableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
