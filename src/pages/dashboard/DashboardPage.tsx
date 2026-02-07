import MetricCard from '@/components/shared/MetricCard';
import StatusPieChart from '@/components/charts/StatusPieChart';
import VolumeLineChart from '@/components/charts/VolumeLineChart';
import { useOverview } from '@/lib/queries';
import { useMode } from '@/context/ModeContext';
import { maskAmountTHB } from '@/lib/masking';

const DashboardPage = () => {
  const { data, isLoading, isError } = useOverview();
  const { isDemoMode } = useMode();
  const demoMode = isDemoMode();

  if (isLoading) {
    return <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading overview...</div>;
  }

  if (isError || !data) {
    return <div className="card p-6 text-sm text-red-600">Unable to load overview.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Overview</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Payment Gateway Health</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VolumeLineChart data={data.volumeSeries} />
        </div>
        <StatusPieChart data={data.statusBreakdown} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Latest Transactions</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Auto-refreshing every 60 seconds</p>
            </div>
            <button className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
              View all
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {data.latestTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-3 dark:border-zinc-800"
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{tx.reference}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{tx.merchant}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {demoMode ? maskAmountTHB(tx.amountTHB) : `฿${tx.amountTHB.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Operational Alerts</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Requires attention</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {data.alerts.map((alert) => (
              <li key={alert} className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                {alert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
