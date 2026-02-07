export type Role = 'super_admin' | 'admin' | 'support' | 'read_only';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
