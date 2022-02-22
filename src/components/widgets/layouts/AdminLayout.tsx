import React, { ReactNode } from 'react';

import AdminSidebar from "@/components/widgets/Sidebars/AdminSidebar";
import DashboardLayout from '@/components/widgets/layouts/DashboardLayout';


const AdminLayout: React.FC<ReactNode> = ({ children }) => {
  return (
    <div className="admin-layout / bg-gray-800">
      <AdminSidebar />
      <DashboardLayout>
        { children }
      </DashboardLayout>
    </div>
  )
};

export default AdminLayout;
