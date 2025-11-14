import { useMemo, useState, useCallback } from 'react';
import { dashboardDataService } from '../services/dataService';

export function useDashboard() {
  const base = dashboardDataService.getData();

  const [tasks, setTasks] = useState(base.tasks.map((t, i) => ({ id: i + 1, title: t, done: false, assignees: base.progress.users.slice(0, 2) })));
  const [zonePeriod, setZonePeriod] = useState('Últ. trimestre');
  const [zoneView, setZoneView] = useState('Por barrio');

  const users = useMemo(() => base.progress.users, [base]);

  const walletPen = useMemo(() => {
    const m = zonePeriod === 'Mes' ? 0.9 : zonePeriod === 'Semana' ? 0.8 : 1;
    const v = zoneView === 'Por barrio' ? 1.05 : 1;
    return Math.round(base.walletPen * m * v + tasks.length * 500);
  }, [base.walletPen, zonePeriod, zoneView, tasks.length]);

  const addTask = useCallback((title, assignees = []) => {
    if (!title) return;
    setTasks(prev => [{ id: Date.now(), title, done: false, assignees }, ...prev]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const assignTask = useCallback((id, assignees) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, assignees } : t)));
  }, []);

  return {
    data: base,
    tasks,
    users,
    walletPen,
    zonePeriod,
    zoneView,
    setZonePeriod,
    setZoneView,
    addTask,
    toggleTask,
    deleteTask,
    assignTask,
  };
}


