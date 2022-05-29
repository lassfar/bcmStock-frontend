import React, { ReactNode } from 'react';
import AdminNavbar from '@/components/widgets/Navbars/AdminNavbar';
import LoadingDashboard from '@/components/widgets/global/indicators/LoadingDashboard';

interface IProps {
  isLoading: boolean,
  children: ReactNode
}

const DashboardLayout: React.FC<IProps> = ({ isLoading, children }: any) => {
  return (
    <div className="dashboard-layout / relative md:ml-64 min-h-screen">
      <AdminNavbar />
      {isLoading ?
        <div className="relative px-5 md:px-8 py-10">
          <LoadingDashboard isLoading={isLoading}></LoadingDashboard>
        </div> : (
        <main className="px-5 md:px-8 py-10">
          {children}
        </main>
      )}
    </div>
  )
};

export default DashboardLayout;
