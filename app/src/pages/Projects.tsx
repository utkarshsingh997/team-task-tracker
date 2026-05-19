import { useState } from 'react';
import { FolderKanban, Plus, Search, MoreVertical, CheckCircle } from 'lucide-react';
import { AppLayout } from '@/components/custom/AppLayout';
import { EmptyState } from '@/components/custom/EmptyState';
import { CreateProjectModal } from '@/components/custom/CreateProjectModal';
import { Toast } from '@/components/custom/Toast';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { useActivities } from '@/hooks/useActivities';

export default function Projects() {
  const { projects, addProject, deleteProject } = useProjects();
  const { tasks } = useTasks();
  const { addActivity } = useActivities();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredProjects = projects
    .filter(p => {
      if (filter === 'active') return p.status === 'active';
      if (filter === 'done') return p.status === 'done';
      return true;
    })
    .filter(p =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );

  const handleCreate = (name: string, description: string) => {
    addProject(name, description);
    addActivity('create_project', `Created project "${name}"`);
    setToast('Project created successfully');
  };

  const handleDelete = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      deleteProject(id);
      addActivity('delete_project', `Deleted project "${project.name}"`);
      setToast('Project deleted');
    }
    setMenuOpen(null);
  };

  const getTaskCount = (projectId: string) => {
    return tasks.filter(t => t.projectId === projectId);
  };

  return (
    <AppLayout>
      <div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">Projects</h1>
            <p className="text-sm text-[#94A3B8]">Manage your projects and team members</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-gradient px-5 py-2.5 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
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
              placeholder="Search projects..."
              className="w-full input-dark pl-10 pr-4 py-2.5 text-sm"
            />
          </div>
          <div className="flex gap-1">
            {(['all', 'active', 'done'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`tab-pill text-sm capitalize ${filter === f ? 'active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="card-surface">
            <EmptyState
              icon={FolderKanban}
              title={projects.length === 0 ? 'No projects yet' : 'No matching projects'}
              actionLabel={projects.length === 0 ? 'Create First Project' : undefined}
              onAction={projects.length === 0 ? () => setShowModal(true) : undefined}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {filteredProjects.map(project => {
              const projectTasks = getTaskCount(project.id);
              const completedCount = projectTasks.filter(t => t.status === 'done').length;
              const totalCount = projectTasks.length;
              const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <div key={project.id} className="card-surface p-6 card-hover transition-all relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[#F1F5F9] truncate">{project.name}</h3>
                      <p className="text-sm text-[#94A3B8] mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)}
                        className="p-2 rounded-lg text-[#64748B] hover:text-[#F1F5F9] hover:bg-white/5 transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpen === project.id && (
                        <div className="absolute right-0 top-full mt-1 bg-[#1A2247] border border-white/10 rounded-xl shadow-xl py-1 z-10 min-w-[140px]">
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="w-full px-4 py-2 text-left text-sm text-[#FF3B30] hover:bg-white/5 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'active'
                        ? 'bg-[#00D1A7]/15 text-[#00D1A7]'
                        : 'bg-[#94A3B8]/15 text-[#94A3B8]'
                    }`}>
                      {project.status === 'active' ? (
                        <><span className="w-1.5 h-1.5 rounded-full bg-[#00D1A7] mr-1.5" />Active</>
                      ) : (
                        <><CheckCircle className="w-3 h-3 mr-1" />Done</>
                      )}
                    </span>
                    <span className="text-xs text-[#94A3B8]">{completedCount}/{totalCount} tasks</span>
                  </div>

                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #5A6BFF, #7B3FE4)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CreateProjectModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
      />

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppLayout>
  );
}
