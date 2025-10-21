import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthSession } from './auth';

interface AuthContextType {
  session: AuthSession | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, email: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentSession = await authService.getCurrentSession();
      setSession(currentSession);
    } catch (error) {
      console.error('Auth check failed:', error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    const newSession = await authService.signIn(username, password);
    setSession(newSession);
  };

  const signUp = async (username: string, password: string, email: string) => {
    await authService.signUp(username, password, email);
  };

  const signOut = async () => {
    await authService.signOut();
    setSession(null);
  };

  const hasRole = (roles: string[]): boolean => {
    if (!session || !session.approved) return false;
    return roles.some(role => session.groups.includes(role));
  };

  const value = {
    session,
    loading,
    signIn,
    signUp,
    signOut,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
