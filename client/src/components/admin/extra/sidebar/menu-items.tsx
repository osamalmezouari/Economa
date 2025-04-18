import { routes } from '../../../../mock/routes';

import {
  PiCalendarDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiCodesandboxLogoDuotone,
  PiCreditCardDuotone,
  PiCurrencyDollarDuotone,
  PiFolder,
  PiFolderLockDuotone,
  PiFoldersLight,
  PiNewspaperClippingDuotone,
  PiPackageDuotone,
  PiUserGearDuotone,
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
import AffiliateIcon from '../../../icons/affiliate';
import ScanQrCodeIcon from '../../../icons/scanqrcode';

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
    icon: <PiCalendarDuotone />,
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
    icon: <PiChartLineUpDuotone />,
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
    icon: <PiFoldersLight />,
  },
  {
    name: 'Orders',
  },
  // label end
  {
    name: 'Orders History',
    href: '/Economa/Admin/Dashboard/OrdersHistory',
    icon: <PiNewspaperClippingDuotone />,
  },
  {
    name: 'Payments Transactions',
    href: '/Economa/Admin/Dashboard/PaymentsTransactions',
    icon: <PiCreditCardDuotone />,
  },
  {
    name: 'Costumers',
  },
  // label end
  {
    name: 'Manage Costumers',
    href: '/Economa/Admin/Dashboard/ManageCostumers',
    icon: <PiUserGearDuotone />,
  },
  /*   {
    name: 'Costumers Profile',
    href: '/Economa/Admin/Dashboard/Rolesandpermessions',
    icon: <TbUserSquareRounded />,
  }, */
  {
    name: 'Roles & Permissions',
    href: '/Economa/Admin/Dashboard/RolesAndPermissions',
    icon: <PiFolderLockDuotone />,
  },

  {
    name: 'Tools',
  },
  // label end
  {
    name: 'Order Verfication',
    href: '/',
    icon: <ScanQrCodeIcon className='w-5 h-5' />,
  },
];
