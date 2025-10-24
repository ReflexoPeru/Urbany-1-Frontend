import React, { createContext, useContext, useState } from 'react';
import { LoadingPage } from '../components/ui/LoadingPage';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingText, setLoadingText] = useState('Cargando...');

  const showLoading = (text = 'Cargando...') => {
    setLoadingText(text);
    setIsLoading(true);
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => setIsVisible(true), 10);
  };

  const hideLoading = () => {
    setIsVisible(false);
    // Esperar a que termine la transición antes de remover del DOM
    setTimeout(() => setIsLoading(false), 300);
  };

  const setLoading = (loading, text = 'Cargando...') => {
    setLoadingText(text);
    if (loading) {
      setIsLoading(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const value = {
    isLoading,
    isVisible,
    loadingText,
    showLoading,
    hideLoading,
    setLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <LoadingPage 
          text={loadingText} 
          isVisible={isVisible}
        />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading debe ser usado dentro de LoadingProvider');
  }
  return context;
};
