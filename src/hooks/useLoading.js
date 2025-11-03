/**
 * Hook para manejar el estado de carga global
 * @returns {Object} - { isLoading, setLoading, showLoading, hideLoading }
 */
import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Cargando...');

  const showLoading = (text = 'Cargando...') => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const setLoading = (loading, text = 'Cargando...') => {
    setLoadingText(text);
    setIsLoading(loading);
  };

  return {
    isLoading,
    loadingText,
    showLoading,
    hideLoading,
    setLoading
  };
};


