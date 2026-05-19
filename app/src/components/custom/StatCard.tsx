import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, iconColor, iconBgColor, delay = 0 }: StatCardProps) {
  return (
    <div
      className="card-surface p-6 flex items-center gap-4 card-hover transition-all cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon className="w-6 h-6" style={{ color: iconColor }} />
      </div>
      <div>
        <p className="text-3xl font-bold text-[#F1F5F9]">{value}</p>
        <p className="text-sm text-[#94A3B8]">{title}</p>
      </div>
    </div>
  );
}
