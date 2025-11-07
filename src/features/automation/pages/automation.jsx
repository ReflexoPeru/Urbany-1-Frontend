import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollableContainer from '../../integrations/components/ScrollableContainer/ScrollableContainer'
import AutomationSidebar from '../components/AutomationSidebar/AutomationSidebar';
import AutomationPreview from '../components/AutomationPreview/AutomationPreview';
import styles from './automation.module.css';

const Automation = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes('/flujos-de-trabajo')) {
      setSelectedCategory('flujos-de-trabajo');
    } else if (currentPath.includes('/plantillas-email')) {
      setSelectedCategory('plantillas-email');
    } else if (currentPath.includes('/plantillas-whatsapp')) {
      setSelectedCategory('plantillas-whatsapp');
    } else {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>Automatización</h1>
          <p className={styles.subtitle}>Cree flujos de trabajo para ahorrarse tiempo en tareas repetitivas</p>
        </header>

        <div className={styles.content}>
          <AutomationSidebar activeCategory={selectedCategory} />

          <div className={styles.main}>
            <ScrollableContainer>
              {selectedCategory ? <Outlet /> : <AutomationPreview />}
            </ScrollableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
