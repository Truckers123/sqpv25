/**
 * Authentication context for managing user sessions and access control
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoginUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  permissions: string[];
  accessLevel: 'board' | 'management' | 'sales' | 'administration' | 'technical_operations';
  lastLogin?: string;
  status: 'active' | 'inactive';
  canDelete?: boolean;
  requiresTwoFA?: boolean;
}

interface AuthContextType {
  user: LoginUser | null;
  login: (user: LoginUser) => void;
  logout: () => void;
  updateUser: (updatedUser: LoginUser) => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    // Check for saved user session on app load
    const savedUser = localStorage.getItem('sqpv_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('sqpv_user');
      }
    }
  }, []);

  const login = (user: LoginUser) => {
    setUser(user);
    localStorage.setItem('sqpv_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sqpv_user');
  };

  const updateUser = (updatedUser: LoginUser) => {
    setUser(updatedUser);
    localStorage.setItem('sqpv_user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = !!user;

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('all_access')) return true;
    return user.permissions.includes(permission);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
