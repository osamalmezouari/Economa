import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/extra/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import ManageRefillsTable from '../../components/admin/extra/manageRefillsTable';
import RefillstatusModel from '../../components/admin/extra/RefillStatusModel';

const ManageRefills = () => {
  const Refills = useSelector(
    (state: RootState) => state.balance.refillsList.data.refills
  );
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Refills Requests"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'products' },
          {
            name: 'Manage Refills',
          },
        ]}
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() => exportToCSV(Refills, `TransactionsCSV`)}
        >
          Export
        </Button>
      </PageHeader>
      <ManageRefillsTable />
      <RefillstatusModel />
    </Box>
  );
};
export default ManageRefills;
