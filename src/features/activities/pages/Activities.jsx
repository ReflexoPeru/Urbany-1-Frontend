import React, { useState, useEffect } from 'react';
import { List, Calendar, Plus, Target } from 'lucide-react';
import { 
  CalendarView, 
  ActivityList, 
  EmptyState, 
  CreateActivityModal, 
  EditActivityModal, 
  DeleteActivityModal 
} from '../components';
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
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          priority: 'high',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          type: 'Llamada',
          title: 'Seguimiento cliente',
          description: 'Llamada de seguimiento con cliente interesado en apartamento',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: '14:30',
          priority: 'medium',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          type: 'Visita',
          title: 'Mostrar propiedad',
          description: 'Visita a casa en el centro de la ciudad para cliente VIP',
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          time: '16:00',
          priority: 'high',
          status: 'completed',
          createdAt: new Date().toISOString()
        }
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
    console.log('Edit activity:', activity);
    setEditingActivity(activity);
    setIsEditModalOpen(true);
  };

  const handleDeleteActivity = (activity) => {
    console.log('Delete activity:', activity);
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

  const handleTypeFilter = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handlePeriodFilter = (period) => {
    setSelectedPeriods(prev => 
      prev.includes(period) 
        ? prev.filter(p => p !== period)
        : [...prev, period]
    );
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

  console.log('Modal states:', {
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    editingActivity,
    deletingActivity
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Actividades</h1>
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'calendar' ? styles.active : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <Calendar size={20} />
            </button>
          </div>
          <button className={styles.clearButton} onClick={handleClearFilters}>
            Limpiar filtros
          </button>
        </div>
      </div>
      
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <span className={styles.label}>Filtrar por:</span>
          <div className={styles.options}>
            {activityTypes.map((type) => (
              <button
                key={type}
                className={`${styles.filterButton} ${
                  selectedTypes.includes(type) ? styles.active : ''
                }`}
                onClick={() => handleTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.filterGroup}>
          <span className={styles.label}>Mostrar por:</span>
          <div className={styles.options}>
            {timePeriods.map((period) => (
              <button
                key={period}
                className={`${styles.filterButton} ${
                  selectedPeriods.includes(period) ? styles.active : ''
                }`}
                onClick={() => handlePeriodFilter(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
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
