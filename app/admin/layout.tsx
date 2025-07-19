"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

const AdminLayoutWrapper: React.FC<AdminLayoutWrapperProps> = ({ children }) => {
  return (
    <AdminProvider>
      <AdminRouteGuard>
        {children}
      </AdminRouteGuard>
    </AdminProvider>
  );
};

const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    // Redirect to dashboard if authenticated and on login page
    if (isAuthenticated && pathname === '/admin/login') {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, pathname, router]);

  // Show loading or login page
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminLayoutWrapper;
