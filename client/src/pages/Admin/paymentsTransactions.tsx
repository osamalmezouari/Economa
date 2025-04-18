import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import PaymentTransactionTable from '../../components/admin/extra/orders/PaymentsTransactions';

const PaymentsTransactions = () => {
  const payments = useSelector(
    (state: RootState) => state.payments.Transactions.data.payments
  );
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Payments Transactions"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'Orders' },
          {
            name: 'Payments Transactions',
          },
        ]}
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() => exportToCSV(payments, `TransactionsCSV`)}
        >
          Export
        </Button>
      </PageHeader>
      <PaymentTransactionTable />
    </Box>
  );
};
export default PaymentsTransactions;
