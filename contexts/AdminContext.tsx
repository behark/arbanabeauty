"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: AdminUser | null;
}

interface AdminUser {
  username: string;
  role: string;
  lastLogin: Date;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple authentication - in production, use proper JWT/OAuth
const ADMIN_CREDENTIALS = {
  username: 'arbana',
  password: 'beauty2024', // Change this to your preferred password
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check if user is already logged in (session storage)
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication check
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData: AdminUser = {
        username,
        role: 'admin',
        lastLogin: new Date(),
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      // Save to session storage
      sessionStorage.setItem('admin_auth', JSON.stringify({
        isAuthenticated: true,
        user: userData,
      }));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
