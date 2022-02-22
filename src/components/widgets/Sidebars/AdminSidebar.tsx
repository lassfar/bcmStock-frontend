import React, { useState } from 'react';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import SidebarLink from '@/components/widgets/Links/SidebarLink';
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon';
import Button from '@/components/widgets/Buttons/Button';
import SidebarDropdown from '@/components/widgets/Dropdowns/SidebarDropdown';
import { ISidebarDropdown } from '@/components/types/widgets/interfaces';
import { sidebarLinks_data } from '@/components/widgets/_data/index';
import { FaArrowDown } from 'react-icons/fa';

const AdminSidebar: React.FC = () => {
  const [sidebarLinks] = useState(sidebarLinks_data as ISidebarDropdown[])

  const constructSidebarItems = (items: ISidebarDropdown[]) => {
    return (
      items.map((item, idx) => {
        if (!item.isDropdown) {
          return (
            <SidebarLink hrefLink={item.hrefLink} isActive={item.isActive} key={idx}>
              <DynamicIcon name={item.icon} />
              <HeadingTitle textSize={9} customclass="ml-2">
                {item.text}
              </HeadingTitle>
            </SidebarLink>
          ); // return
        }
        else {
          return (
            <SidebarDropdown hrefLink="#" links={item.links} key={idx}>
              <DynamicIcon name={item.icon} />
              <HeadingTitle textSize={9} customclass="ml-2">
                {item.text}
              </HeadingTitle>
              {/* <Button type="button">
                {FaArrowDown}
              </Button> */}
            </SidebarDropdown>
          ); // return
        }
      })
    )
  } // construct

  return (
    <div id="adminSidebar" className="admin-sidebar / w-64 h-screen / fixed left-0 top-0 / bg-primary">
      <div className="admin-sidebar-header / h-14 py-4 px-2">
        <HeadingTitle textSize={8} customclass="text-white uppercase font-black text-center">
          BECOMAR
        </HeadingTitle>
      </div>
      <div className="admin-sidebar-body / py-4 px-2">  
        <HeadingTitle textSize={10} customclass="uppercase font-bold text-white mb-2">
          Pages
        </HeadingTitle>

        {constructSidebarItems(sidebarLinks)}
        
      </div>
    </div>
  )
};

export default AdminSidebar;
