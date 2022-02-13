import React, { ReactNode } from 'react';

import AdminSidebar from "@/components/Sidebars/AdminSidebar";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AdminNavbar from '@/components/Navbars/AdminNavbar';


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
