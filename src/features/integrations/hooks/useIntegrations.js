import { useState, useEffect } from 'react';
import { getIntegrations, getCategories, toggleIntegration } from '../services/integrationsService';

export const useIntegrations = () => {
  const [integrations, setIntegrations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('portales');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [integrationsData, categoriesData] = await Promise.all([
          Promise.resolve(getIntegrations()),
          Promise.resolve(getCategories())
        ]);
        
        setIntegrations(integrationsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleIntegrationToggle = async (integrationId) => {
    try {
      await toggleIntegration(integrationId);
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, isActive: !integration.isActive }
            : integration
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    if (activeCategory === 'portales') {
      return integration.category === 'Integración personalizada' || 
             integration.category === 'Portales pagos';
    }
    return true;
  });

  return {
    integrations: filteredIntegrations,
    categories,
    activeCategory,
    loading,
    error,
    handleCategoryChange,
    handleIntegrationToggle
  };
};
