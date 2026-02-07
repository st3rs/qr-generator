import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  QueueListIcon,
  ShieldCheckIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { canViewSettings } from '@/lib/rbac';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: ChartPieIcon },
  { name: 'Merchants', to: '/merchants', icon: BuildingStorefrontIcon },
  { name: 'Transactions', to: '/transactions', icon: ArrowsRightLeftIcon },
  { name: 'Settlements', to: '/settlements', icon: BanknotesIcon },
  { name: 'Webhooks', to: '/webhooks', icon: QueueListIcon },
  { name: 'Logs', to: '/logs', icon: DocumentChartBarIcon },
  { name: 'Settings', to: '/settings', icon: Cog6ToothIcon, requiresSettings: true }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const canAccessSettings = user ? canViewSettings(user.role) : false;

  return (
    <aside
      className={clsx(
        'flex flex-col border-r border-zinc-200 bg-white px-4 py-6 transition-all dark:border-zinc-800 dark:bg-zinc-950',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ShieldCheckIcon className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">PromptPay → USDT</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin Console</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded-lg border border-zinc-200 p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
        >
          <CurrencyDollarIcon className="h-4 w-4" />
        </button>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navigation.map((item) => (
          item.requiresSettings && !canAccessSettings ? (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400"
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        {!collapsed ? (
          <div className="space-y-1">
            <p className="font-medium text-zinc-700 dark:text-zinc-200">Environment</p>
            <p>API: https://api.promptpay.internal</p>
            <p>Region: ap-southeast-1</p>
          </div>
        ) : (
          <p className="text-center">ENV</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
