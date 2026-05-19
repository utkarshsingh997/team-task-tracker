import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Task, TaskStatus, TaskPriority } from '@/types';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow_tasks', []);

  const addTask = useCallback((title: string, description: string, projectId: string, priority: TaskPriority, status: TaskStatus, dueDate: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      projectId,
      priority,
      status,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newStatus: TaskStatus = t.status === 'done' ? 'todo' : 'done';
        return { ...t, status: newStatus };
      }
      return t;
    }));
  }, [setTasks]);

  const getTasksByProject = useCallback((projectId: string) => {
    return tasks.filter(t => t.projectId === projectId);
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTasksByProject,
  };
}
