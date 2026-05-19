import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { User, AuthState } from '@/types';

export function useAuth() {
  const [auth, setAuth] = useLocalStorage<AuthState>('taskflow_auth', {
    user: null,
    isAuthenticated: false,
  });

  const [users, setUsers] = useLocalStorage<User[]>('taskflow_users', []);

  const login = useCallback((email: string, _password: string): boolean => {
    const foundUser = users.find((u: User) => u.email === email);
    if (foundUser) {
      setAuth({ user: foundUser, isAuthenticated: true });
      return true;
    }
    return false;
  }, [users, setAuth]);

  const signup = useCallback((name: string, email: string, _password: string, role: 'admin' | 'member'): boolean => {
    if (users.some((u: User) => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
    };
    setUsers([...users, newUser]);
    setAuth({ user: newUser, isAuthenticated: true });
    return true;
  }, [users, setUsers, setAuth]);

  const logout = useCallback(() => {
    setAuth({ user: null, isAuthenticated: false });
  }, [setAuth]);

  const updateProfile = useCallback((name: string) => {
    if (auth.user) {
      const updatedUser = { ...auth.user, name };
      setAuth({ ...auth, user: updatedUser });
      setUsers(users.map((u: User) => u.id === updatedUser.id ? updatedUser : u));
    }
  }, [auth, setAuth, users, setUsers]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
  };
}
