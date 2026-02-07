import SettlementsTable from '@/components/tables/SettlementsTable';
import { useSettlements } from '@/lib/queries';
import { useMode } from '@/context/ModeContext';
import { maskAmountTHB } from '@/lib/masking';

const SettlementsPage = () => {
  const { data, isLoading, isError } = useSettlements();
  const { isDemoMode } = useMode();
  const demoMode = isDemoMode();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Settlements</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Settlement Operations</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ready to settle</p>
          <p className="text-2xl font-semibold">
            {demoMode ? maskAmountTHB(8_200_000) : '฿8.2M'}
          </p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Pending confirmations</p>
          <p className="text-2xl font-semibold">5</p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Failed batches</p>
          <p className="text-2xl font-semibold">1</p>
        </div>
      </div>
      {isLoading && <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading settlements...</div>}
      {isError && <div className="card p-6 text-sm text-red-600">Unable to load settlements.</div>}
      {!isLoading && !isError && <SettlementsTable items={data?.settlements ?? []} />}
    </div>
  );
};

export default SettlementsPage;
