import { routes } from '../../../../mock/routes';

import {
  PiChartBarDuotone,
  PiCodesandboxLogoDuotone,
  PiCreditCardDuotone,
  PiFolderLockDuotone,
  PiPackageDuotone,
} from 'react-icons/pi';
import {
  MdOutlineFolderCopy,
  MdOutlineManageHistory,
  MdOutlinePayments,
} from 'react-icons/md';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsQrCodeScan } from 'react-icons/bs';
import { GrTransaction } from 'react-icons/gr';
import { RiUserSettingsLine } from 'react-icons/ri';
import { TbMailCog, TbUserSquareRounded } from 'react-icons/tb';

export interface MenuItemType {
  name: string;
  icon?: React.ReactNode;
  href?: string;
  dropdownItems?: {
    name: string;
    icon?: React.ReactNode;
    href: string;
  }[];
}
// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItemType[] = [
  // label start
  {
    name: 'Overview',
  },
  {
    name: 'Store Analytics',
    href: '/Economa/Admin/Dashboard',
    icon: <PiChartBarDuotone />,
  },
  {
    name: 'Refill Insights',
    href: '/Economa/Admin/Dashboard/RefillInsights',
    icon: <PiCreditCardDuotone />,
  },

  // label start
  {
    name: 'Products',
  },
  // label end
  {
    name: 'Manage Products',
    href: '/Economa/Admin/Dashboard/ManageProducts',
    icon: <PiPackageDuotone />,
  },
  {
    name: 'Stock Transactions',
    href: '/Economa/Admin/Dashboard/Stock_Transactions',
    icon: <GrTransaction />,
  },
  {
    name: 'Manage Categories',
    href: '/Economa/Admin/Dashboard/ManageCategories',
    icon: <BiCategoryAlt />,
  },

  // label start
  {
    name: 'Refill Requests',
  },
  // label end
  {
    name: 'Manage Refills',
    href: '/Economa/Admin/Dashboard/ManageRefills',
    icon: <TbMailCog />,
  },
  {
    name: 'Orders',
  },
  // label end
  {
    name: 'Orders History',
    href: routes.forms.profileSettings,
    icon: <MdOutlineFolderCopy />,
  },
  {
    name: 'Payments transactions',
    href: routes.forms.personalInformation,
    icon: <MdOutlinePayments />,
  },
  {
    name: 'Costumers',
  },
  // label end
  {
    name: 'Manage Costumers',
    href: routes.tables.basic,
    icon: <RiUserSettingsLine />,
  },
  {
    name: 'Costumers Profile',
    href: routes.tables.collapsible,
    icon: <TbUserSquareRounded />,
  },
  {
    name: 'Roles & Permissions',
    href: routes.tables.collapsible,
    icon: <PiFolderLockDuotone />,
  },

  {
    name: 'Tools',
  },
  // label end
  {
    name: 'Order Verfication',
    href: '/',
    icon: <BsQrCodeScan />,
  },
];
