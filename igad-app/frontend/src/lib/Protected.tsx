import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedProps {
  children: React.ReactNode;
  roles?: string[];
}

export function Protected({ children, roles = [] }: ProtectedProps) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Not approved
  if (!session.approved) {
    return <Navigate to="/awaiting-approval" replace />;
  }

  // Role check
  if (roles.length > 0 && !roles.some(role => session.groups.includes(role))) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
}
