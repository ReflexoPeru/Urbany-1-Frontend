import { useState, useEffect, useMemo } from 'react';
import { activityService } from '../services/activityService';

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await activityService.getActivities();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const addActivity = async (activityData) => {
    try {
      const newActivity = await activityService.createActivity(activityData);
      setActivities(prev => [...prev, newActivity]);
      return newActivity;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateActivity = async (id, activityData) => {
    try {
      const updatedActivity = await activityService.updateActivity(id, activityData);
      setActivities(prev => 
        prev.map(activity => 
          activity.id === id ? updatedActivity : activity
        )
      );
      return updatedActivity;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteActivity = async (id) => {
    try {
      await activityService.deleteActivity(id);
      setActivities(prev => prev.filter(activity => activity.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    activities,
    loading,
    error,
    addActivity,
    updateActivity,
    deleteActivity
  };
};
