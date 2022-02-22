import React from 'react';
import AdminNavbar from '@/components/widgets/Navbars/AdminNavbar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className="dashboard-layout / relative md:ml-64 min-h-screen">
      <AdminNavbar />
      <main className="px-8 py-4">
        { children }
      </main>
    </div>
  )
};

export default DashboardLayout;
