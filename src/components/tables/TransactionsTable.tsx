import type { Transaction } from '@/types/data';
import { useMode } from '@/context/ModeContext';
import { maskAmountTHB } from '@/lib/masking';

interface TransactionsTableProps {
  items: Transaction[];
}

const statusStyles: Record<Transaction['status'], string> = {
  completed: 'badge-success',
  pending: 'badge-warning',
  failed: 'badge-danger'
};

const TransactionsTable = ({ items }: TransactionsTableProps) => {
  const { isDemoMode } = useMode();
  const demoMode = isDemoMode();

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Realtime Transactions</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">PromptPay transfers with settlement state</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            className="rounded-lg border border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900"
            placeholder="Search reference"
          />
          <select className="rounded-lg border border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
            <option>Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <select className="rounded-lg border border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
            <option>Merchant</option>
            <option>Nova Commerce</option>
            <option>Atlas Travels</option>
            <option>Brio Media</option>
          </select>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900">
          <tr>
            <th className="px-6 py-3">Reference</th>
            <th className="px-6 py-3">Merchant</th>
            <th className="px-6 py-3">Amount (THB)</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
          {items.map((tx) => (
            <tr key={tx.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
              <td className="px-6 py-4 font-mono text-xs">{tx.reference}</td>
              <td className="px-6 py-4">{tx.merchant}</td>
              <td className="px-6 py-4">
                {demoMode ? maskAmountTHB(tx.amountTHB) : `฿${tx.amountTHB.toLocaleString()}`}
              </td>
              <td className="px-6 py-4">
                <span className={`badge ${statusStyles[tx.status]}`}>{tx.status}</span>
              </td>
              <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{tx.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
