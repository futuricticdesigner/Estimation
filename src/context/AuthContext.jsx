import { createContext, useState, useCallback } from 'react';
import { authUtils } from '@/utils/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authUtils.getSession());

  const login = useCallback(({ email, password }) => {
    const result = authUtils.login({ email, password });
    if (result.ok) setSession(result.session);
    return result;
  }, []);

  const signUp = useCallback(({ name, email, password }) => {
    const result = authUtils.signUp({ name, email, password });
    if (result.ok) setSession(result.session);
    return result;
  }, []);

  const logout = useCallback(() => {
    authUtils.logout();
    setSession(null);
  }, []);

  const updateProfile = useCallback(({ name, email }) => {
    const result = authUtils.updateProfile({ userId: session?.userId, name, email });
    if (result.ok) setSession(result.session);
    return result;
  }, [session?.userId]);

  const changePassword = useCallback(({ currentPassword, newPassword }) => {
    return authUtils.changePassword({ userId: session?.userId, currentPassword, newPassword });
  }, [session?.userId]);

  const resetPassword = useCallback(({ email, newPassword }) => {
    return authUtils.resetPassword({ email, newPassword });
  }, []);

  return (
    <AuthContext.Provider value={{ session, isAuthenticated: !!session, login, signUp, logout, updateProfile, changePassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
