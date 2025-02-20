// src/app/dashboard/layout.tsx
import DashboardTopBar from '@/components/DashboardTopBar';
import './dashboard.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-screen">
      <DashboardTopBar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
