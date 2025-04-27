import {
  PiCalendarDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiCreditCardDuotone,
  PiFolderLockDuotone,
  PiFolderSimplePlus,
  PiFoldersLight,
  PiNewspaperClippingDuotone,
  PiPackageDuotone,
  PiUserGearDuotone,
} from 'react-icons/pi';
import { BiCategoryAlt } from 'react-icons/bi';
import ScanQrCodeIcon from '../components/icons/scanqrcode';
import useRoleLvl from './useRolelvl';
import { useEffect, useState } from 'react';
import { TbBrandSentry } from 'react-icons/tb';

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

export const useMenuItems = () => {
  const { rolelvl, loading } = useRoleLvl();
  const [menu, setmenu] = useState<MenuItemType[]>([]);
  const pathname = window.location.pathname;

  const MenuItemsForAdmins: MenuItemType[] = [
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
      name: 'Order Verification',
      href: '/Economa/Admin/Dashboard/OrderVerification',
      icon: <ScanQrCodeIcon className="w-5 h-5" />,
    },
  ];
  const MenuItemsForUsers: MenuItemType[] = [
    {
      name: 'My Profile',
    },
    {
      name: 'Manage Profile',
      href: '/Economa/User/Profile',
      icon: <PiUserGearDuotone />,
    },
    {
      name: 'Orders',
    },
    {
      name: 'My Orders',
      href: '/Economa/User/Profile/My Orders',
      icon: <PiNewspaperClippingDuotone />,
    },
    {
      name: 'Refills',
    },
    {
      name: 'My Refills',
      href: '/Economa/User/Profile/My Refills',
      icon: <PiFoldersLight />,
    },
    {
      name: 'Make Refills',
      href: '/Economa/User/Profile/Make Refills',
      icon: <PiFolderSimplePlus />,
    },
    {
      name: 'Make Transfers',
      href: '/Economa/User/Profile/Make Transfers',
      icon: <TbBrandSentry />,
    },
  ];

  useEffect(() => {
    if (
      (rolelvl < 3 && pathname.startsWith('/Economa/admin/Dashboard')) ||
      pathname.startsWith('/Economa/Admin/Dashboard')
    ) {
      setmenu(MenuItemsForAdmins);
    } else if (
      pathname.startsWith('/Economa/User/Profile') ||
      pathname.startsWith('/Economa/user/Profile')
    ) {
      setmenu(MenuItemsForUsers);
    }
  }, [rolelvl, pathname]);

  return {
    menu,
    loading,
  };
};

export default useMenuItems;
