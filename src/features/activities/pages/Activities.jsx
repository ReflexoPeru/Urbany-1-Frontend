import React, { useState, useEffect } from 'react';
import {
  ActivityHeader,
  FilterGroup,
  CalendarView,
  ActivityList,
  EmptyState,
  CreateActivityModal,
  EditActivityModal,
  DeleteActivityModal,
} from '../components';
import Button from '../../../components/ui/Button';
import styles from './Activities.module.css';

const Activities = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedTypes, setSelectedTypes] = useState(['Agente']);
  const [selectedPeriods, setSelectedPeriods] = useState(['Por hacer', 'Hoy']);
  const [activities, setActivities] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deletingActivity, setDeletingActivity] = useState(null);

  const activityTypes = [
    'Agente',
    'Llamada',
    'Correo electrónico',
    'Visita',
    'Reunión',
    'Tasación',
    'Firma de contrato',
    'Otro'
  ];

  const timePeriods = [
    'Por hacer',
    'Vencido',
    'Hoy',
    'Mañana',
    'Esta semana',
    'Seleccionar periodo'
  ];

  useEffect(() => {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const sampleActivities = [
        {
          id: 1,
          type: 'Agente',
          title: 'Reunión con cliente',
          description: 'Reunión para revisar propiedades disponibles en el centro',
          date: '2025-10-28',
          time: '10:00',
          priority: 'high',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          type: 'Llamada',
          title: 'Seguimiento cliente',
          description: 'Llamada de seguimiento con cliente interesado en apartamento',
          date: '2025-10-29',
          time: '14:30',
          priority: 'medium',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ];
      setActivities(sampleActivities);
      localStorage.setItem('activities', JSON.stringify(sampleActivities));
    }
  }, []);

  const saveActivities = (newActivities) => {
    setActivities(newActivities);
    localStorage.setItem('activities', JSON.stringify(newActivities));
  };

  const handleAddActivity = (date = null) => {
    setIsCreateModalOpen(true);
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setIsEditModalOpen(true);
  };

  const handleDeleteActivity = (activity) => {
    setDeletingActivity(activity);
    setIsDeleteModalOpen(true);
  };

  const handleCreateActivity = (activityData) => {
    const newActivity = {
      ...activityData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    saveActivities([...activities, newActivity]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateActivity = (activityData) => {
    const updatedActivities = activities.map(activity =>
      activity.id === editingActivity.id ? activityData : activity
    );
    saveActivities(updatedActivities);
    setIsEditModalOpen(false);
    setEditingActivity(null);
  };

  const handleConfirmDelete = () => {
    const updatedActivities = activities.filter(activity => activity.id !== deletingActivity.id);
    saveActivities(updatedActivities);
    setIsDeleteModalOpen(false);
    setDeletingActivity(null);
  };

  const handleStatusChange = (activityId, newStatus) => {
    const updatedActivities = activities.map(activity =>
      activity.id === activityId ? { ...activity, status: newStatus } : activity
    );
    saveActivities(updatedActivities);
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedPeriods([]);
  };

  const filterActivities = (activities) => {
    if (selectedTypes.length === 0 && selectedPeriods.length === 0) {
      return activities;
    }

    return activities.filter(activity => {
      const typeMatch = selectedTypes.length === 0 ||
        selectedTypes.includes(activity.type);

      const periodMatch = selectedPeriods.length === 0 || selectedPeriods.some(period => {
        const activityDate = new Date(activity.date);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        switch (period) {
          case 'Por hacer':
            return activity.status === 'pending';
          case 'Vencido':
            return activity.status === 'pending' && activityDate < today;
          case 'Hoy':
            return activityDate.toDateString() === today.toDateString();
          case 'Mañana':
            return activityDate.toDateString() === tomorrow.toDateString();
          case 'Esta semana':
            const weekStart = new Date(today);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            return activityDate >= weekStart && activityDate <= weekEnd;
          default:
            return true;
        }
      });

      return typeMatch && periodMatch;
    });
  };

  const filteredActivities = filterActivities(activities);

  return (
    <div className={styles.container}>
      <ActivityHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddActivity={handleAddActivity}
      />

      <div className={styles.filtersContainer}>
        <div className={styles.filtersToolbar}>
          <div className={styles.filtersSummary}>
            {filteredActivities.length > 0
              ? `${filteredActivities.length} actividades filtradas`
              : 'Sin actividades filtradas'}
          </div>
          <Button
            variant="secondary"
            size="small"
            onClick={handleClearFilters}
            className={styles.clearButton}
          >
            Limpiar filtros
          </Button>
        </div>

        <FilterGroup
          title="Filtrar por"
          options={activityTypes}
          selectedValues={selectedTypes}
          onSelectionChange={setSelectedTypes}
          multiple
        />

        <FilterGroup
          title="Mostrar por"
          options={timePeriods}
          selectedValues={selectedPeriods}
          onSelectionChange={setSelectedPeriods}
          multiple
        />
      </div>

      <main className={styles.mainContent}>
        {filteredActivities.length > 0 ? (
          viewMode === 'list' ? (
            <ActivityList
              activities={filteredActivities}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <CalendarView
              activities={filteredActivities}
              onAddActivity={handleAddActivity}
              onEditActivity={handleEditActivity}
            />
          )
        ) : (
          <EmptyState onAddActivity={handleAddActivity} />
        )}
      </main>

      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateActivity}
      />

      <EditActivityModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleUpdateActivity}
        activity={editingActivity}
      />

      <DeleteActivityModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingActivity(null);
        }}
        onConfirm={handleConfirmDelete}
        activity={deletingActivity}
      />
    </div>
  );
};

export default Activities;
