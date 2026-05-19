import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#64748B]" />
      </div>
      <p className="text-[#94A3B8] text-sm mb-4">{title}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-gradient px-5 py-2.5 text-sm flex items-center gap-2">
          <span className="text-lg leading-none">+</span>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
