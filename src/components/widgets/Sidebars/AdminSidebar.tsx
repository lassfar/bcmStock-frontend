import React, { useState } from 'react'
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle'
import SidebarLink from '@/components/widgets/Links/SidebarLink'
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon'
import Button from '@/components/widgets/Buttons/Button'
import SidebarDropdown from '@/components/widgets/Dropdowns/SidebarDropdown'
import { ISidebarDropdown } from '@/components/types/widgets/interfaces'
import { sidebarLinksConfig } from '@/components/widgets/_data/index'
import { FaBars } from 'react-icons/fa'
import { EButtonType, ETextSize } from '@/components/types/props/enum'

const AdminSidebar: React.FC = () => {
  const [sidebarLinks] = useState(sidebarLinksConfig as ISidebarDropdown[])
  const [isSidebarCollapsed, setCollapseSidebar] = useState(false)

  const constructSidebarItems = (items: ISidebarDropdown[]) => {
    return items.map((item, idx) => {
      if (!item.isDropdown) {
        return (
          <SidebarLink
            hrefLink={item.hrefLink}
            isActive={item.isActive}
            key={idx}
          >
            <DynamicIcon name={item.icon} />
            <HeadingTitle textSize={ETextSize.sm} customclass="ml-2">
              {item.text}
            </HeadingTitle>
          </SidebarLink>
        ) // return
      } else {
        return (
          <SidebarDropdown hrefLink="#" links={item.links} key={idx}>
            <DynamicIcon name={item.icon} />
            <HeadingTitle textSize={ETextSize.sm} customclass="ml-2">
              {item.text}
            </HeadingTitle>
            {/* <Button type="button">
              {FaArrowDown}
            </Button> */}
          </SidebarDropdown>
        ) // return
      }
    })
  } // construct

  return (
    <div
      id="adminSidebar"
      className={`admin-sidebar / w-64 h-screen / fixed left-0 top-0 / bg-dark ${isSidebarCollapsed ? 'translate-x-0' : 'translate-x-0'}`}
    >
      <div className="admin-sidebar-header / flex items-center h-14 py-4 px-2">
        <HeadingTitle
          textSize={8}
          customclass="text-white uppercase font-black text-center"
        >
          BECOMAR
        </HeadingTitle>
        <Button
          type={EButtonType.button}
          customclass={'border border-solid border-gray-300 rounded-sm p-2 ml-auto'}
        >
          <DynamicIcon name={FaBars} />
        </Button>
      </div>
      <div className="admin-sidebar-body / py-4 px-2">
        <HeadingTitle
          textSize={10}
          customclass="uppercase font-bold text-white mb-2"
        >
          Pages
        </HeadingTitle>

        {constructSidebarItems(sidebarLinks)}
      </div>
    </div>
  )
}

export default AdminSidebar
