import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthState, Role, User } from '@/types/auth';
import { apiClient, isApiEnabled } from '@/lib/apiClient';
import { clearStoredAuth, getStoredToken, getStoredUser, setStoredAuth } from '@/lib/authStorage';

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mockUsers: Record<string, Role> = {
  'admin@demo.com': 'admin',
  'super@demo.com': 'super_admin',
  'support@demo.com': 'support',
  'view@demo.com': 'read_only'
};

const getMockUser = (email: string): User | null => {
  const role = mockUsers[email];
  if (!role) return null;
  return {
    id: `mock-${role}`,
    name: email.split('@')[0],
    role,
    email
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null
  });

  const hasRole = useCallback(
    (roles: Role[]) => {
      if (!state.user) return false;
      return roles.includes(state.user.role);
    },
    [state.user]
  );

  const login = useCallback(async (email: string, password: string) => {
    if (isApiEnabled) {
      const response = await apiClient.post<{ accessToken: string; user: User }>('/auth/login', {
        email,
        password
      });
      const { accessToken, user } = response.data;
      setStoredAuth(accessToken, user);
      setState({ token: accessToken, user });
      return;
    }

    if (password !== 'admin') {
      throw new Error('Invalid credentials');
    }

    const user = getMockUser(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const accessToken = `mock-token-${user.role}`;
    setStoredAuth(accessToken, user);
    setState({ token: accessToken, user });
  }, []);

  const logout = useCallback(async () => {
    if (isApiEnabled) {
      try {
        await apiClient.post('/auth/logout');
      } catch {
        // ignore logout failures
      }
    }
    clearStoredAuth();
    setState({ token: null, user: null });
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    const user = getStoredUser();
    if (token && user) {
      setState({ token, user });
    }

    if (isApiEnabled && token) {
      apiClient
        .get<{ user: User }>('/auth/me')
        .then((response) => {
          setStoredAuth(token, response.data.user);
          setState({ token, user: response.data.user });
        })
        .catch(() => {
          clearStoredAuth();
          setState({ token: null, user: null });
        });
    }

    const handleLogout = () => {
      clearStoredAuth();
      setState({ token: null, user: null });
    };
    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      hasRole
    }),
    [state, login, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
