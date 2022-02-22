
import { FaHome, FaListAlt, FaListUl, FaPlusSquare } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { ISidebarLink, IDashboardBox } from '@/components/types/widgets/interfaces';
import { BiBox, BiFile, BiPackage, BiTestTube } from "react-icons/bi"
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
    ],
  },
  {
    hrefLink: '#',
    text: 'Commandes',
    icon: BiPackage,
    isDropdown: true,
    isActive: false,
    links: [
      {
        hrefLink: '/orders/order-add',
        text: 'New Order',
        icon: FaPlusSquare,
        isActive: false,
      },
      {
        hrefLink: '/orders/order-list',
        text: 'Order List',
        icon: FaListUl,
        isActive: false,
      },
    ],
  },
]

export const dashboardBoxes_data: IDashboardBox[] = [
  {
    text: 'Produits',
    count: 23,
    icon: BiPackage,
    bgColor: 'yellow',
    textColor: 'black'
  },
  {
    text: 'Commandes',
    count: 107,
    icon: BiBox,
    bgColor: 'blue',
    textColor: 'white'
  },
  {
    text: 'Projets',
    count: 7,
    icon: BiFile,
    bgColor: 'red',
    textColor: 'white'
  },
  {
    text: 'Devis',
    count: 468,
    icon: BiTestTube,
    bgColor: 'green',
    textColor: 'white'
  },
]