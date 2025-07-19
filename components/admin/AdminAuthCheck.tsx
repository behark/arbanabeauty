"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthCheckProps {
  children: React.ReactNode;
}

const AdminAuthCheck: React.FC<AdminAuthCheckProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (!isLoggedIn || !loginTime) {
        setIsAuthenticated(false);
        return;
      }

      // Check if session is still valid (24 hours)
      const now = new Date().getTime();
      const loginTimestamp = parseInt(loginTime);
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (now - loginTimestamp > sessionDuration) {
        // Session expired
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (isAuthenticated === false) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AdminAuthCheck;
