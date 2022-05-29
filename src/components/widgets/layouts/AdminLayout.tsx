import React, { ReactNode, useState, useEffect } from 'react';
import AdminSidebar from "@/components/widgets/Sidebars/AdminSidebar";
import DashboardLayout from '@/components/widgets/layouts/DashboardLayout';
import { useRouter } from 'next/router';

const AdminLayout: React.FC<ReactNode> = ({ children }) => {

  const [isPageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoading(true));
    router.events.on('routeChangeComplete', () => setPageLoading(false));
    router.events.on('routeChangeError', () => setPageLoading(false));
  }, [router])
  
  return (
    <div className="admin-layout / dark:bg-dark bg-gray-50">
      <AdminSidebar />
      <DashboardLayout isLoading={isPageLoading}>
        {children}
      </DashboardLayout>
    </div>
  )
};

export default AdminLayout;
