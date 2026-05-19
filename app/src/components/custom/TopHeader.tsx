import { Search, Bell } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

export function TopHeader() {
  const { user } = useAuthContext();

  return (
    <header className="sticky top-0 z-40 bg-[#0A0E1F]/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
        <input
          type="text"
          placeholder="Search projects, tasks..."
          className="w-full input-dark pl-10 pr-4 py-2.5 text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF3B30]" />
        </button>

        {user && (
          <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-xl px-3 py-1.5 transition-all">
            <div className="w-8 h-8 rounded-full gradient-avatar flex items-center justify-center text-white font-semibold text-xs">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <span className="text-sm font-medium text-[#F1F5F9]">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
}
