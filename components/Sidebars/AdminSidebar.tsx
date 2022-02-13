import React from 'react';
import Dropdown from '../Dropdowns/SidebarDropdown';

const AdminSidebar: React.FC = () => {
  return (
    <div id="adminSidebar" className="admin-sidebar / w-64 h-screen / fixed left-0 top-0 / bg-primary">
      <div className="admin-sidebar-header / h-14 py-4 px-3">
        <h1 className="text-white uppercase font-black text-center">
          BECOMAR
        </h1>
      </div>
      <div className="admin-sidebar-body / py-4 px-3">
        <h6 className="md:min-w-full text-white text-xs uppercase font-bold text-center block pt-1 pb-4 no-underline">
          Admin Layout Pages
        </h6>
        <div className="sidebar-dropdown">
          <Dropdown></Dropdown>
        </div>
      </div>
    </div>
  )
};

export default AdminSidebar;
