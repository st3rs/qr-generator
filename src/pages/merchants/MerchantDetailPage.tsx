import { useParams } from 'react-router-dom';
import { useMerchantDetail } from '@/lib/queries';
import { useMode } from '@/context/ModeContext';
import { maskApiKey, maskAmountTHB, maskPhoneOrPromptpay, maskWallet } from '@/lib/masking';

const MerchantDetailPage = () => {
  const { merchantId = '' } = useParams();
  const { data, isLoading, isError } = useMerchantDetail(merchantId);
  const { isDemoMode } = useMode();
  const demoMode = isDemoMode();

  if (isLoading) {
    return <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading merchant...</div>;
  }

  if (isError || !data) {
    return <div className="card p-6 text-sm text-red-600">Unable to load merchant.</div>;
  }

  const { merchant, recentTransactions } = data;

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Merchant</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{merchant.name}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Merchant profile</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">PromptPay ID</p>
              <p className="font-mono text-sm">
                {demoMode ? maskPhoneOrPromptpay(merchant.promptPayId) : merchant.promptPayId}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">USDT Wallet</p>
              <p className="font-mono text-sm">{demoMode ? maskWallet(merchant.usdtWallet) : merchant.usdtWallet}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">API Key</p>
              <p className="font-mono text-sm">{demoMode ? maskApiKey(merchant.apiKey) : merchant.apiKey}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Risk tier</p>
              <p className="text-sm capitalize">{merchant.riskTier}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Settlement rules</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Daily settlement window: 08:00 - 09:00 (ICT)</li>
            <li>Min batch size: ฿200,000</li>
            <li>Fee: 0.35% + network fee</li>
            <li>Auto retries: 2</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">IP whitelist</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <li>13.45.82.21</li>
            <li>13.45.82.22</li>
            <li>13.45.82.23</li>
          </ul>
        </div>
        <div className="card p-6 lg:col-span-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">Recent transactions</p>
          <div className="mt-4 space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-3 dark:border-zinc-800">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{tx.reference}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{tx.createdAt}</p>
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
      </div>
    </div>
  );
};

export default MerchantDetailPage;
