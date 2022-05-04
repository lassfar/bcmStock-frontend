import React, { ReactNode, useState } from 'react';
import AdminSidebar from "@/components/widgets/Sidebars/AdminSidebar";
import DashboardLayout from '@/components/widgets/layouts/DashboardLayout';

const AdminLayout: React.FC<ReactNode> = ({ children }) => {
  
  return (
    <div className="admin-layout / dark:bg-dark bg-gray-50">
      <AdminSidebar />
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </div>
  )
};

export default AdminLayout;
