import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { useMode } from '@/context/ModeContext';

const AppLayout = () => {
  const { isAuditorMode, isDemoMode } = useMode();
  const showAuditorBanner = isAuditorMode();
  const showDemoBanner = isDemoMode();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {showAuditorBanner && (
          <div className="border-b border-amber-200 bg-amber-50 px-8 py-2 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/30 dark:text-amber-200">
            AUDITOR MODE: Read-only access. No actions permitted.
          </div>
        )}
        {showDemoBanner && (
          <div className="border-b border-blue-200 bg-blue-50 px-8 py-2 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/30 dark:text-blue-200">
            DEMO MODE: Data masked. For presentation only.
          </div>
        )}
        <TopHeader />
        <main className="flex-1 px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
