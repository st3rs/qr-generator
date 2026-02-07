import TransactionsTable from '@/components/tables/TransactionsTable';
import { useTransactions } from '@/lib/queries';

const TransactionsPage = () => {
  const { data, isLoading, isError } = useTransactions();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Transactions</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Transaction Monitoring</h2>
      </div>
      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Success rate</p>
            <p className="text-2xl font-semibold">98.3%</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Avg. settlement time</p>
            <p className="text-2xl font-semibold">14m</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Pending</p>
            <p className="text-2xl font-semibold">128</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Failed</p>
            <p className="text-2xl font-semibold">24</p>
          </div>
        </div>
      </div>
      {isLoading && <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading transactions...</div>}
      {isError && <div className="card p-6 text-sm text-red-600">Unable to load transactions.</div>}
      {!isLoading && !isError && <TransactionsTable items={data?.transactions ?? []} />}
    </div>
  );
};

export default TransactionsPage;
