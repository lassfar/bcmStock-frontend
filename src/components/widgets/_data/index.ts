
import { FaHome, FaListAlt, FaListUl, FaPlusSquare } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { ISidebarLink } from '@/components/types/widgets/interfaces';
import { BiPackage } from "react-icons/bi"
import { MdOutlineList } from "react-icons/md"
import { ISidebarDropdown } from './../../types/widgets/interfaces';

export const sidebarLinks_data: ISidebarDropdown[] = [
  {
    hrefLink: '/admin/dashboard',
    text: 'Dashboard',
    icon: FaHome,
    isDropdown: false,
    isActive: false,
  },
  {
    hrefLink: '/admin/settings',
    text: 'Settings',
    icon: IoMdSettings,
    isDropdown: false,
    isActive: false,
  },
  {
    hrefLink: '#',
    text: 'Produits',
    icon: BiPackage,
    isDropdown: true,
    isActive: false,
    links: [
      {
        hrefLink: '/products/product-add',
        text: 'Create product',
        icon: FaPlusSquare,
        isActive: false,
      },
      {
        hrefLink: '/products/product-list',
        text: 'Product List',
        icon: FaListUl,
        isActive: false,
      },
    ]
  },
]