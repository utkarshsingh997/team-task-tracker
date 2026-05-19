import type { TaskPriority } from '@/types';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityLabels: Record<TaskPriority, string> = {
  'high': 'High',
  'medium': 'Medium',
  'low': 'Low',
};

const priorityClasses: Record<TaskPriority, string> = {
  'high': 'priority-high',
  'medium': 'priority-medium',
  'low': 'priority-low',
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityClasses[priority]}`}>
      {priorityLabels[priority]}
    </span>
  );
}
