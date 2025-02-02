export const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      name: 'Products',
      icon: <InventoryIcon />,
      dropdownItems: [
        { name: 'Add Product', href: '/products/add' },
        { name: 'Product List', href: '/products/list' },
      ],
    },
    {
      name: 'Orders',
      icon: <OrderIcon />,
      dropdownItems: [
        { name: 'Pending Orders', href: '/orders/pending' },
        { name: 'Completed Orders', href: '/orders/completed' },
      ],
    },
    {
      name: 'Customers',
      href: '/customers',
      icon: <PeopleIcon />,
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: <BarChartIcon />,
    },
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      dropdownItems: [
        { name: 'Profile Settings', href: '/settings/profile' },
        { name: 'Admin Management', href: '/settings/admin' },
      ],
    },
  ];
  