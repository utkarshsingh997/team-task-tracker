import type { TaskStatus } from '@/types';

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusLabels: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'review': 'Review',
  'done': 'Done',
};

const statusClasses: Record<TaskStatus, string> = {
  'todo': 'status-todo',
  'in-progress': 'status-in-progress',
  'review': 'status-review',
  'done': 'status-done',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
