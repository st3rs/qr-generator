import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { can, type Action } from '@/lib/rbac';

export type AppMode = 'normal' | 'auditor' | 'demo';

interface ModeContextValue {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  demoDataEnabled: boolean;
  setDemoDataEnabled: (enabled: boolean) => void;
  isAuditorMode: () => boolean;
  isDemoMode: () => boolean;
  canMutate: (action: Action) => boolean;
}

const MODE_KEY = 'trst_admin_mode';
const DEMO_DATA_KEY = 'trst_admin_demo_data';

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

const normalizeMode = (value: string | null): AppMode | null => {
  if (!value) return null;
  if (value === 'auditor' || value === 'demo' || value === 'normal') return value;
  return null;
};

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [mode, setModeState] = useState<AppMode>('normal');
  const [demoDataEnabled, setDemoDataEnabledState] = useState<boolean>(() => {
    const stored = localStorage.getItem(DEMO_DATA_KEY);
    return stored === '1';
  });

  useEffect(() => {
    const storedMode = normalizeMode(localStorage.getItem(MODE_KEY));
    if (storedMode) {
      setModeState(storedMode);
      return;
    }

    const params = new URLSearchParams(location.search);
    const queryMode = normalizeMode(params.get('mode'));
    if (queryMode === 'demo') {
      setModeState('demo');
      return;
    }

    if (queryMode === 'auditor' && user?.role === 'read_only') {
      setModeState('auditor');
      return;
    }

    setModeState('normal');
  }, [location.search, user?.role]);

  useEffect(() => {
    if (mode === 'demo' && localStorage.getItem(DEMO_DATA_KEY) === null) {
      setDemoDataEnabled(true);
    }
  }, [mode]);

  const setMode = (nextMode: AppMode) => {
    if (nextMode === 'normal') {
      localStorage.removeItem(MODE_KEY);
    } else {
      localStorage.setItem(MODE_KEY, nextMode);
    }
    setModeState(nextMode);
  };

  const setDemoDataEnabled = (enabled: boolean) => {
    localStorage.setItem(DEMO_DATA_KEY, enabled ? '1' : '0');
    setDemoDataEnabledState(enabled);
  };

  const isAuditorMode = () => mode === 'auditor';
  const isDemoMode = () => mode === 'demo';

  const canMutate = (action: Action) => {
    if (isAuditorMode()) return false;
    if (!user) return false;
    return can(action, user.role);
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
      demoDataEnabled,
      setDemoDataEnabled,
      isAuditorMode,
      isDemoMode,
      canMutate
    }),
    [mode, demoDataEnabled, user]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
};
