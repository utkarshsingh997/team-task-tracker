import { FolderKanban, CheckSquare, Clock, AlertTriangle, Activity, Calendar, PieChart } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AppLayout } from '@/components/custom/AppLayout';
import { StatCard } from '@/components/custom/StatCard';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';

const COLORS_STATUS = ['#94A3B8', '#38BDF8', '#A78BFA', '#00D1A7'];
const COLORS_PRIORITY = ['#FF3B30', '#FF9F43', '#5A6BFF'];

export default function Dashboard() {
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter(t => {
    if (t.status === 'done') return false;
    return t.dueDate && new Date(t.dueDate) < new Date();
  }).length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statusData = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
    { name: 'Review', value: tasks.filter(t => t.status === 'review').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length },
  ].filter(d => d.value > 0);

  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
  ].filter(d => d.value > 0);

  const upcomingDeadlines = tasks
    .filter(t => t.status !== 'done' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">Dashboard</h1>
        <p className="text-sm text-[#94A3B8] mb-6">Overview of your projects and tasks</p>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <StatCard title="Total Projects" value={totalProjects} icon={FolderKanban} iconColor="#5A6BFF" iconBgColor="rgba(90,107,255,0.15)" delay={0} />
          <StatCard title="Total Tasks" value={totalTasks} icon={CheckSquare} iconColor="#38BDF8" iconBgColor="rgba(56,189,248,0.15)" delay={50} />
          <StatCard title="In Progress" value={inProgressTasks} icon={Clock} iconColor="#FF9F43" iconBgColor="rgba(255,159,67,0.15)" delay={100} />
          <StatCard title="Overdue" value={overdueTasks} icon={AlertTriangle} iconColor="#FF3B30" iconBgColor="rgba(255,59,48,0.15)" delay={150} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {/* Task Status */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-4 h-4 text-[#5A6BFF]" />
              <h3 className="text-base font-semibold text-[#F1F5F9]">Task Status</h3>
            </div>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <RePieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_STATUS[index % COLORS_STATUS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#121836',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      color: '#F1F5F9',
                      fontSize: '12px',
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[180px]">
                <p className="text-sm text-[#64748B]">No tasks yet</p>
              </div>
            )}
            {statusData.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                {statusData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS_STATUS[index % COLORS_STATUS.length] }} />
                    <span className="text-xs text-[#94A3B8]">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Task Priority */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#FF9F43]" />
              <h3 className="text-base font-semibold text-[#F1F5F9]">Task Priority</h3>
            </div>
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <RePieChart>
                  <Pie data={priorityData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {priorityData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#121836',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      color: '#F1F5F9',
                      fontSize: '12px',
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[180px]">
                <p className="text-sm text-[#64748B]">No tasks yet</p>
              </div>
            )}
            {priorityData.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                {priorityData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS_PRIORITY[index % COLORS_PRIORITY.length] }} />
                    <span className="text-xs text-[#94A3B8]">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completion Rate */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#00D1A7]" />
              <h3 className="text-base font-semibold text-[#F1F5F9]">Completion Rate</h3>
            </div>
            <div className="flex flex-col items-center justify-center h-[180px]">
              <span className="text-5xl font-bold text-gradient">{completionRate}%</span>
              <p className="text-sm text-[#94A3B8] mt-1">tasks completed</p>
            </div>
            <div className="space-y-3 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Completed</span>
                <span className="text-[#00D1A7] font-medium">{completedTasks}</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${completionRate}%`,
                    background: 'linear-gradient(90deg, #5A6BFF, #7B3FE4)',
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Remaining</span>
                <span className="text-[#5A6BFF] font-medium">{totalTasks - completedTasks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-5">
          {/* Upcoming Deadlines */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#FF9F43]" />
              <h3 className="text-base font-semibold text-[#F1F5F9]">Upcoming Deadlines</h3>
            </div>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-3">
                {upcomingDeadlines.map(task => (
                  <div key={task.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-[#F1F5F9]">{task.title}</span>
                    <span className="text-xs text-[#94A3B8]">{new Date(task.dueDate!).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Calendar className="w-10 h-10 text-[#64748B] mb-2" />
                <p className="text-sm text-[#64748B]">No upcoming deadlines</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#5A6BFF]" />
              <h3 className="text-base font-semibold text-[#F1F5F9]">Recent Activity</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-8">
              <Activity className="w-10 h-10 text-[#64748B] mb-2" />
              <p className="text-sm text-[#64748B]">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
