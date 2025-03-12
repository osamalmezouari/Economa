import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/extra/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import StockTransactionTable from '../../components/admin/extra/stockTransactionsTable';

const StockTransaction = () => {
  const Transactions = useSelector(
    (state: RootState) =>
      state.products.stockTransactions.data.stockTransactions
  );
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Stock Transactions"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'products' },
          {
            name: 'Stock Transactions',
          },
        ]}
        className="custom-class"
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() => exportToCSV(Transactions, 'TransactionsCSV')}
        >
          Export
        </Button>
      </PageHeader>
      <StockTransactionTable />
    </Box>
  );
};
export default StockTransaction;
