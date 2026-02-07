import type { Settlement } from '@/types/data';
import { useMode } from '@/context/ModeContext';
import { maskAmountTHB, maskAmountUSDT } from '@/lib/masking';

interface SettlementsTableProps {
  items: Settlement[];
}

const statusStyles: Record<Settlement['status'], string> = {
  confirmed: 'badge-success',
  pending: 'badge-warning',
  failed: 'badge-danger'
};

const SettlementsTable = ({ items }: SettlementsTableProps) => {
  const { canMutate, isDemoMode } = useMode();
  const canRetry = canMutate('retry_settlement');
  const canExport = canMutate('export_data');
  const demoMode = isDemoMode();

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Settlement Batches</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">TRC20 confirmations + retry controls</p>
        </div>
        {canExport && (
          <button className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            Export
          </button>
        )}
      </div>
      <table className="w-full text-left">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900">
          <tr>
            <th className="px-6 py-3">Settlement</th>
            <th className="px-6 py-3">Amount (THB)</th>
            <th className="px-6 py-3">Amount (USDT)</th>
            <th className="px-6 py-3">Fee %</th>
            <th className="px-6 py-3">Net</th>
            <th className="px-6 py-3">Tx Hash</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
          {items.map((settlement) => (
            <tr key={settlement.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
              <td className="px-6 py-4 font-semibold">{settlement.id}</td>
              <td className="px-6 py-4">
                {demoMode ? maskAmountTHB(settlement.amountTHB) : `฿${settlement.amountTHB.toLocaleString()}`}
              </td>
              <td className="px-6 py-4">
                {demoMode ? maskAmountUSDT(settlement.amountUSDT) : settlement.amountUSDT.toLocaleString()}
              </td>
              <td className="px-6 py-4">{settlement.fee}%</td>
              <td className="px-6 py-4">
                {demoMode ? maskAmountUSDT(settlement.netAmount) : settlement.netAmount.toLocaleString()}
              </td>
              <td className="px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400">{settlement.txHash}</td>
              <td className="px-6 py-4">
                <span className={`badge ${statusStyles[settlement.status]}`}>{settlement.status}</span>
              </td>
              <td className="px-6 py-4 text-right">
                {canRetry && (
                  <button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                    Retry
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SettlementsTable;
