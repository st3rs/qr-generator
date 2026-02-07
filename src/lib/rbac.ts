import type { Role } from '@/types/auth';

export type Action = 'view_settings' | 'manage_merchants' | 'retry_settlement' | 'export_data' | 'view_payload';

const actionMatrix: Record<Action, Role[]> = {
  view_settings: ['super_admin'],
  manage_merchants: ['super_admin', 'admin'],
  retry_settlement: ['super_admin', 'admin', 'support'],
  export_data: ['super_admin', 'admin', 'support'],
  view_payload: ['super_admin', 'admin', 'support']
};

export const can = (action: Action, role: Role) => actionMatrix[action].includes(role);

export const canViewSettings = (role: Role) => can('view_settings', role);
