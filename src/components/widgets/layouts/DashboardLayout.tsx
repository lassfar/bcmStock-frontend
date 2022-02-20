import React from 'react';
import AdminNavbar from '@/components/widgets/Navbars/AdminNavbar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout / relative md:ml-64 min-h-screen">
      <AdminNavbar />
    </div>
  )
};

export default DashboardLayout;
