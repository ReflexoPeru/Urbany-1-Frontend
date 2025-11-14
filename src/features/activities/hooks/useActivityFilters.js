import { useState, useMemo } from 'react';

const ACTIVITY_TYPES = [
  'Agente',
  'Llamada', 
  'Correo electrónico',
  'Visita',
  'Reunión',
  'Tasación',
  'Firma de contrato',
  'Otro'
];

const TIME_PERIODS = [
  'Por hacer',
  'Vencido', 
  'Hoy',
  'Mañana',
  'Esta semana',
  'Seleccionar periodo'
];

export const useActivityFilters = () => {
  const [selectedTypes, setSelectedTypes] = useState(['Agente']);
  const [selectedPeriods, setSelectedPeriods] = useState(['Por hacer', 'Hoy']);
  const [customDateRange, setCustomDateRange] = useState(null);

  const filterActivities = (activities) => {
    return activities.filter(activity => {
      const typeMatch = selectedTypes.length === 0 || 
        selectedTypes.includes(activity.type);
      
      const periodMatch = selectedPeriods.some(period => {
        switch (period) {
          case 'Por hacer':
            return activity.status === 'pending';
          case 'Vencido':
            return activity.status === 'overdue';
          case 'Hoy':
            return activity.date === 'Hoy' || activity.date === new Date().toLocaleDateString();
          case 'Mañana':
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return activity.date === tomorrow.toLocaleDateString();
          case 'Esta semana':
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            const activityDate = new Date(activity.date);
            return activityDate >= weekStart && activityDate <= weekEnd;
          case 'Seleccionar periodo':
            return customDateRange && 
              activity.date >= customDateRange.start && 
              activity.date <= customDateRange.end;
          default:
            return true;
        }
      });

      return typeMatch && periodMatch;
    });
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedPeriods([]);
    setCustomDateRange(null);
  };

  const hasActiveFilters = selectedTypes.length > 0 || 
    selectedPeriods.length > 0 || 
    customDateRange !== null;

  return {
    selectedTypes,
    setSelectedTypes,
    selectedPeriods,
    setSelectedPeriods,
    customDateRange,
    setCustomDateRange,
    filterActivities,
    clearFilters,
    hasActiveFilters,
    activityTypes: ACTIVITY_TYPES,
    timePeriods: TIME_PERIODS
  };
};
