import { useState } from 'react';
import { X } from 'lucide-react';
import type { TaskPriority, TaskStatus } from '@/types';
import type { Project } from '@/types';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string, projectId: string, priority: TaskPriority, status: TaskStatus, dueDate: string) => void;
  projects: Project[];
}

export function CreateTaskModal({ open, onClose, onCreate, projects }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (!projectId) {
      setError('Please select a project');
      return;
    }
    onCreate(title.trim(), description.trim(), projectId, priority, status, dueDate);
    setTitle('');
    setDescription('');
    setProjectId(projects[0]?.id || '');
    setPriority('medium');
    setStatus('todo');
    setDueDate('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop" onClick={onClose}>
      <div className="modal-content card-surface w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#64748B] hover:text-[#F1F5F9] hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-[#F1F5F9] mb-1">Create New Task</h2>
        <p className="text-sm text-[#94A3B8] mb-6">Add a new task to your project</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setError(''); }}
              className="w-full input-dark px-4 py-2.5 text-sm"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full input-dark px-4 py-2.5 text-sm min-h-[80px] resize-none"
              placeholder="Add more details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Project</label>
            <select
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
              className="w-full input-dark px-4 py-2.5 text-sm appearance-none cursor-pointer"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full input-dark px-4 py-2.5 text-sm appearance-none cursor-pointer"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full input-dark px-4 py-2.5 text-sm appearance-none cursor-pointer"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full input-dark px-4 py-2.5 text-sm"
            />
          </div>

          {error && <p className="text-[#FF3B30] text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-gradient flex-1 py-2.5 text-sm">
              Create Task
            </button>
            <button type="button" onClick={onClose} className="btn-secondary px-5 py-2.5 text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
