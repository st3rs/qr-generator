import { useMode } from '@/context/ModeContext';

const SettingsPage = () => {
  const { demoDataEnabled, setDemoDataEnabled } = useMode();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Settings</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Configuration</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Environment info</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Cluster: prod-apac-1</li>
            <li>PromptPay gateway: v2.4.1</li>
            <li>USDT provider: TRC20 Primary</li>
            <li>Ledger sync: 22 seconds</li>
          </ul>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Rate limits</p>
          <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center justify-between">
              <span>Webhook TPS</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">1,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Transaction TPS</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">850</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Settlement TPS</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">90</span>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Feature toggles</p>
          <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <label className="flex items-center justify-between">
              <span>Auto retry settlements</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between">
              <span>Webhook replay</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between">
              <span>Risk scoring alerts</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Presentation controls</p>
          <div className="mt-4 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Use demo data</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Force mock data for presentation-only environments.</p>
            </div>
            <button
              type="button"
              onClick={() => setDemoDataEnabled(!demoDataEnabled)}
              className={`h-5 w-10 rounded-full transition ${
                demoDataEnabled ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white shadow transition ${
                  demoDataEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Global limits</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Daily volume cap</p>
              <p className="text-lg font-semibold">฿200M</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">USDT liquidity buffer</p>
              <p className="text-lg font-semibold">8.5M</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Alert threshold</p>
              <p className="text-lg font-semibold">75%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
