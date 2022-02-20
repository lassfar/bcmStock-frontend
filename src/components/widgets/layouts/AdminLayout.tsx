import React, { ReactNode } from 'react';

import AdminSidebar from "@/components/widgets/Sidebars/AdminSidebar";
import DashboardLayout from '@/components/widgets/layouts/DashboardLayout';
import AdminNavbar from '@/components/widgets/Navbars/AdminNavbar';


const AdminLayout: React.FC<ReactNode> = ({ children }) => {
  return (
    <div className="admin-layout / bg-slate-100">
      <AdminSidebar />
      <DashboardLayout>
        <AdminNavbar />
        { children }
      </DashboardLayout>
    </div>
  )
};

export default AdminLayout;
