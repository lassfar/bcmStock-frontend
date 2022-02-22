import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ISidebarDropdown } from '@/components/types/widgets/interfaces';
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import SidebarSublink from '@/components/widgets/Links/SidebarSublink';
import SidebarDropdownButton from './../Buttons/SidebarDropdownButton';


const SidebarDropdown: React.FC<ISidebarDropdown> = ({ links, children }) => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const [isActive, setActive] = useState(false)

  const isActiveLink = (hrefLink: string): boolean => router.pathname.includes(hrefLink)

  useEffect(() => {
    links?.forEach(item => {
      if (isActiveLink(item.hrefLink)) {
        setActive(true);
        setOpen(true);
      }
    })
  }, []);

  const toggleDropdown = (e: React.MouseEvent<any>) => {
    e.stopPropagation()
    setOpen(!isOpen)
  }

  const dropdownToggleClassNames = (isDropdownOpen: boolean): string => {
    return isDropdownOpen ? 'max-h-full scale-y-1 opacity-100' : 'max-h-0 -scale-y-0 opacity-0'
  }


  return (
    <div className={`sidebar-dropdown / relative`}>
      {/* <SidebarDropdownButton isActive={isActive} clickEvent={toggleDropdown}>
        {children}
      </SidebarDropdownButton> */}
      <button className={`sidebar-dropdownButton ${isActive ? 'active' : ''} ${isOpen ? 'bg-black/20' : ''}`} onClick={toggleDropdown}>
        {children}
      </button>
      <div className={`sidebar-dropdown-links transition-all relative origin-top overflow-hidden ${dropdownToggleClassNames(isOpen)} ${isActive ? 'active' : ''}`}>
        {links?.map((item, idx) => (
          <SidebarSublink hrefLink={item.hrefLink} isActive={item.isActive} key={idx}>
            <DynamicIcon name={item.icon} />
            <HeadingTitle textSize={9} customclass="ml-2">
              {item.text}
            </HeadingTitle>
          </SidebarSublink>
        ))}
      </div>
    </div>
  );
};

export default SidebarDropdown;
