import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  BellAlertIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useMode } from '@/context/ModeContext';

const TopHeader = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isAuditorMode, isDemoMode, demoDataEnabled, setDemoDataEnabled, canMutate } = useMode();
  const canToggleDemoData = canMutate('export_data');
  const showAuditor = isAuditorMode();
  const showDemo = isDemoMode();

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-8 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Environment</p>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Production Cluster · PromptPay → USDT
        </h1>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          {showAuditor && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
              Auditor
            </span>
          )}
          {showDemo && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
              Demo
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 lg:flex">
          <span>Use demo data</span>
          <button
            type="button"
            onClick={() => setDemoDataEnabled(!demoDataEnabled)}
            disabled={!canToggleDemoData}
            className={`h-4 w-8 rounded-full transition ${
              demoDataEnabled ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
            } ${!canToggleDemoData ? 'opacity-50' : ''}`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white shadow transition ${
                demoDataEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {theme === 'light' && <SunIcon className="h-4 w-4" />}
            {theme === 'dark' && <MoonIcon className="h-4 w-4" />}
            {theme === 'system' && <ComputerDesktopIcon className="h-4 w-4" />}
            Theme
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-40 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
              {(['light', 'dark', 'system'] as const).map((value) => (
                <Menu.Item key={value}>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme(value)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-xs ${
                        active ? 'bg-zinc-100 dark:bg-zinc-800' : ''
                      }`}
                    >
                      {value[0].toUpperCase() + value.slice(1)}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
        <button className="relative rounded-lg border border-zinc-200 p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          <BellAlertIcon className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-200">
            <div className="text-right">
              <p className="font-semibold">{user?.name ?? 'Operator'}</p>
              <p className="text-xs uppercase text-zinc-400">{user?.role ?? 'read_only'}</p>
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
              <Menu.Item>
                {({ active }) => (
                  <div className={`rounded-lg px-3 py-2 text-sm ${active ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}>
                    <p className="font-medium">{user?.email}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Security profile</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                      active ? 'bg-zinc-100 dark:bg-zinc-800' : ''
                    }`}
                  >
                    <span className="text-zinc-500 dark:text-zinc-400">Use demo data</span>
                    <button
                      type="button"
                      onClick={() => setDemoDataEnabled(!demoDataEnabled)}
                      disabled={!canToggleDemoData}
                      className={`h-4 w-8 rounded-full transition ${
                        demoDataEnabled ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
                      } ${!canToggleDemoData ? 'opacity-50' : ''}`}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full bg-white shadow transition ${
                          demoDataEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => void logout()}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm ${active ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default TopHeader;
