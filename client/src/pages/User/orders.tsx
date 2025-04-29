import { Box } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import Orders from '../../components/user/extra/Orders/orders';

const OrdersPage = () => {
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="My Orders"
        breadcrumb={[
          { name: 'Profile', href: '/Economa/User/Profile' },
          { name: 'Orders' },
          {
            name: 'My Orders',
          },
        ]}
        className="custom-Fclass"
      ></PageHeader>
      <Orders />
    </Box>
  );
};
export default OrdersPage;
