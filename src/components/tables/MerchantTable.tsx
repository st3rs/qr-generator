import { Link } from 'react-router-dom';
import type { Merchant } from '@/types/data';
import { useMode } from '@/context/ModeContext';
import { maskApiKey, maskPhoneOrPromptpay, maskWallet } from '@/lib/masking';

interface MerchantTableProps {
  items: Merchant[];
}

const MerchantTable = ({ items }: MerchantTableProps) => {
  const { canMutate, isDemoMode } = useMode();
  const canManage = canMutate('manage_merchants');
  const demoMode = isDemoMode();

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Merchant Portfolio</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Live PromptPay to USDT routing</p>
        </div>
        {canManage && (
          <button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">Add merchant</button>
        )}
      </div>
      <table className="w-full text-left">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900">
          <tr>
            <th className="px-6 py-3">Merchant</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">PromptPay ID</th>
            <th className="px-6 py-3">USDT Wallet</th>
            <th className="px-6 py-3">API Key</th>
            <th className="px-6 py-3">Risk Tier</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
          {items.map((merchant) => (
            <tr key={merchant.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
              <td className="px-6 py-4">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{merchant.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{merchant.id}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`badge ${merchant.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                  {merchant.status}
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-xs">
                {demoMode ? maskPhoneOrPromptpay(merchant.promptPayId) : merchant.promptPayId}
              </td>
              <td className="px-6 py-4 font-mono text-xs">
                {demoMode ? maskWallet(merchant.usdtWallet) : merchant.usdtWallet}
              </td>
              <td className="px-6 py-4 font-mono text-xs">
                {demoMode ? maskApiKey(merchant.apiKey) : merchant.apiKey}
              </td>
              <td className="px-6 py-4 capitalize">{merchant.riskTier}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/merchants/${merchant.id}`}
                    className="rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
                  >
                    View
                  </Link>
                  {canManage && (
                    <button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                      {merchant.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantTable;
