import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0E1F]">
      <Sidebar />
      <div className="ml-[240px] min-h-screen flex flex-col">
        <TopHeader />
        <main className="flex-1 p-8 page-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
