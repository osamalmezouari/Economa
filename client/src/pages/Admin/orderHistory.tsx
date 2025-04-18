import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import OrdersHistoryTable from '../../components/admin/extra/orders/OrderHistory';

const OrderHistory = () => {
  const orders = useSelector(
    (state: RootState) => state.order.OrdersHistory.data.orders
  );
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Orders History"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'Orders' },
          {
            name: 'Orders History',
          },
        ]}
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() => exportToCSV(orders, `TransactionsCSV`)}
        >
          Export
        </Button>
      </PageHeader>
      <OrdersHistoryTable />
    </Box>
  );
};
export default OrderHistory;
