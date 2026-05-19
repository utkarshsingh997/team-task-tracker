import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

export function CreateProjectModal({ open, onClose, onCreate }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    onCreate(name.trim(), description.trim());
    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop" onClick={onClose}>
      <div className="modal-content card-surface w-full max-w-md p-8 relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#64748B] hover:text-[#F1F5F9] hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-[#F1F5F9] mb-1">Create New Project</h2>
        <p className="text-sm text-[#94A3B8] mb-6">Set up a new project for your team</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              className="w-full input-dark px-4 py-2.5 text-sm"
              placeholder="Enter project name"
              autoFocus
            />
            {error && <p className="text-[#FF3B30] text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full input-dark px-4 py-2.5 text-sm min-h-[100px] resize-none"
              placeholder="Describe your project..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-gradient flex-1 py-2.5 text-sm">
              Create Project
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
