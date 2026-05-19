import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useLocalStorage<Project[]>('taskflow_projects', []);

  const addProject = useCallback((name: string, description: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, [setProjects]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, [setProjects]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, [setProjects]);

  const getProjectById = useCallback((id: string) => {
    return projects.find(p => p.id === id);
  }, [projects]);

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
  };
}
