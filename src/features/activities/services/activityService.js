const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/activities';

const mockActivities = [
  {
    id: 1,
    type: 'Agente',
    description: 'Reunión con cliente para revisar propiedades',
    date: 'Hoy',
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    type: 'Llamada',
    description: 'Seguimiento con cliente interesado en apartamento',
    date: 'Mañana',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    type: 'Visita',
    description: 'Mostrar casa en el centro de la ciudad',
    date: 'Esta semana',
    status: 'completed',
    priority: 'high',
    createdAt: new Date().toISOString()
  }
];

class ActivityService {
  async getActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }
      return await response.json();
    } catch (error) {
      console.warn('Usando datos mock debido a error de API:', error.message);
      return mockActivities;
    }
  }

  async getActivityById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener actividad');
      }
      return await response.json();
    } catch (error) {
      console.warn('Usando datos mock debido a error de API:', error.message);
      return mockActivities.find(activity => activity.id === id);
    }
  }

  async createActivity(activityData) {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear actividad');
      }
      
      return await response.json();
    } catch (error) {
      console.warn('Usando datos mock debido a error de API:', error.message);
      const newActivity = {
        id: Date.now(),
        ...activityData,
        createdAt: new Date().toISOString()
      };
      return newActivity;
    }
  }

  async updateActivity(id, activityData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar actividad');
      }
      
      return await response.json();
    } catch (error) {
      console.warn('Usando datos mock debido a error de API:', error.message);
      return {
        id,
        ...activityData,
        updatedAt: new Date().toISOString()
      };
    }
  }

  async deleteActivity(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar actividad');
      }
      
      return true;
    } catch (error) {
      console.warn('Usando datos mock debido a error de API:', error.message);
      return true;
    }
  }

  async getActivitiesByType(type) {
    const activities = await this.getActivities();
    return activities.filter(activity => activity.type === type);
  }

  async getActivitiesByStatus(status) {
    const activities = await this.getActivities();
    return activities.filter(activity => activity.status === status);
  }

  async getActivitiesByDateRange(startDate, endDate) {
    const activities = await this.getActivities();
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate >= startDate && activityDate <= endDate;
    });
  }
}

export const activityService = new ActivityService();
