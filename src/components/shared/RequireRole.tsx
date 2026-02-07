import { Navigate, Outlet } from 'react-router-dom';
import type { Role } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

interface RequireRoleProps {
  allowedRoles: Role[];
}

const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
