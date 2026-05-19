import { useState } from 'react';
import { CheckSquare, Plus, Search, ChevronDown, Calendar, FolderKanban, Trash2 } from 'lucide-react';
import { AppLayout } from '@/components/custom/AppLayout';
import { EmptyState } from '@/components/custom/EmptyState';
import { CreateTaskModal } from '@/components/custom/CreateTaskModal';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { PriorityBadge } from '@/components/custom/PriorityBadge';
import { Toast } from '@/components/custom/Toast';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { useActivities } from '@/hooks/useActivities';
import type { TaskStatus } from '@/types';

const statusFilters: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];

export default function Tasks() {
  const { projects } = useProjects();
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTasks();
  const { addActivity } = useActivities();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');

  const filteredTasks = tasks
    .filter(t => statusFilter === 'all' || t.status === statusFilter)
    .filter(t => projectFilter === 'all' || t.projectId === projectFilter)
    .filter(t =>
      search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    );

  const handleCreate = (title: string, description: string, projectId: string, priority: 'high' | 'medium' | 'low', status: TaskStatus, dueDate: string) => {
    addTask(title, description, projectId, priority, status, dueDate);
    const projectName = projects.find(p => p.id === projectId)?.name || 'Unknown';
    addActivity('create_task', `Created task "${title}" in ${projectName}`);
    setToast('Task created successfully');
  };

  const handleToggle = (taskId: string) => {
    toggleTaskStatus(taskId);
  };

  const handleDelete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      deleteTask(taskId);
      addActivity('delete_task', `Deleted task "${task.title}"`);
      setToast('Task deleted');
    }
  };

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  return (
    <AppLayout>
      <div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">Tasks</h1>
            <p className="text-sm text-[#94A3B8]">Manage and track your tasks across projects</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-gradient px-5 py-2.5 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full input-dark pl-10 pr-4 py-2.5 text-sm"
            />
          </div>

          {/* Project Filter */}
          <div className="relative">
            <select
              value={projectFilter}
              onChange={e => setProjectFilter(e.target.value)}
              className="input-dark pl-4 pr-10 py-2.5 text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
          </div>

          {/* Status Filters */}
          <div className="flex gap-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`tab-pill text-sm ${statusFilter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            {statusFilters.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`tab-pill text-sm capitalize ${statusFilter === s ? 'active' : ''}`}
              >
                {s === 'todo' ? 'To Do' : s === 'in-progress' ? 'In Progress' : s === 'review' ? 'Review' : 'Done'}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="card-surface">
            <EmptyState
              icon={CheckSquare}
              title={tasks.length === 0 ? 'No tasks yet' : 'No matching tasks'}
              actionLabel={tasks.length === 0 ? 'Create First Task' : undefined}
              onAction={tasks.length === 0 ? () => setShowModal(true) : undefined}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div key={task.id} className="card-surface p-4 flex items-center gap-4 card-hover transition-all">
                {/* Checkbox */}
                <button
                  onClick={() => handleToggle(task.id)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    task.status === 'done'
                      ? 'bg-[#00D1A7] border-[#00D1A7]'
                      : 'border-[#64748B] hover:border-[#5A6BFF]'
                  }`}
                >
                  {task.status === 'done' && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                </button>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate ${task.status === 'done' ? 'text-[#64748B] line-through' : 'text-[#F1F5F9]'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[#64748B]">
                      <FolderKanban className="w-3 h-3" />
                      {getProjectName(task.projectId)}
                    </span>
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />

                {/* Delete */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 rounded-lg text-[#64748B] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
        projects={projects}
      />

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppLayout>
  );
}
