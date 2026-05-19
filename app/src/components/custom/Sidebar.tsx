import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Settings, Zap, LogOut } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { user, logout } = useAuthContext();

  return (
    <aside className="sidebar-surface fixed left-0 top-0 h-full w-[240px] flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-[#F1F5F9]">TaskFlow</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item w-full ${isActive ? 'active' : ''}`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Card */}
      {user && (
        <div className="mx-3 mb-4 p-3 rounded-xl bg-[#121836] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-avatar flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#F1F5F9] truncate">{user.name}</p>
              <p className="text-xs text-[#64748B] truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-[#64748B] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
