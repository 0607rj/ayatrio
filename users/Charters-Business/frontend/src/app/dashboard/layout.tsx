'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import FirstLoginPasswordChange from '@/components/auth/FirstLoginPasswordChange';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Check if user should access this dashboard
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect admin/recruiter to their dashboard
    if (user.role === 'admin' || user.role === 'recruiter') {
      router.push('/admin/dashboard');
      return;
    }

    // Check first login for regular users
    if (user.isFirstLogin) {
      setShowPasswordChange(true);
    }
  }, [user, isLoading, router]);

  const handlePasswordChangeSuccess = () => {
    updateUser({ isFirstLogin: false });
    setShowPasswordChange(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B30437] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render for admin/recruiter or not logged in
  if (!user || user.role === 'admin' || user.role === 'recruiter') {
    return null;
  }

  return (
    <>
      {/* First Login Password Change Modal */}
      {showPasswordChange && (
        <FirstLoginPasswordChange onSuccess={handlePasswordChangeSuccess} />
      )}

      {/* Dashboard Layout */}
      <div className="min-h-screen bg-white">
        <DashboardNavbar />

        <div className="flex pt-16">
          <DashboardSidebar />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
