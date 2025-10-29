import { useState } from 'react';

export const useActivityView = () => {
  const [viewMode, setViewMode] = useState('list');

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'list' ? 'calendar' : 'list');
  };

  const changeViewMode = (mode) => {
    if (['list', 'calendar'].includes(mode)) {
      setViewMode(mode);
    }
  };

  return {
    viewMode,
    setViewMode: changeViewMode,
    toggleViewMode
  };
};
