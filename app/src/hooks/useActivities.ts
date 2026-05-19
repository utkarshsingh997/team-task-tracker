import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Activity } from '@/types';

export function useActivities() {
  const [activities, setActivities] = useLocalStorage<Activity[]>('taskflow_activities', []);

  const addActivity = useCallback((action: string, description: string) => {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      action,
      description,
      timestamp: new Date().toISOString(),
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50));
  }, [setActivities]);

  return {
    activities,
    addActivity,
  };
}
