import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import ManageCostumersTable from '../../components/admin/extra/costumers/manageCostumers/manageCostumers';
import { BiPlus } from 'react-icons/bi';
import AddUserDialog from '../../components/admin/extra/costumers/manageCostumers/addUser';
import { openAddUserDialog } from '../../features/user/userSlice';
import UpdateUserDialog from '../../components/admin/extra/costumers/manageCostumers/updateUser';

const ManageCostumers = () => {
  const { data } = useSelector((state: RootState) => state.user.UserDetails);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Manage Customers"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'customers' },
          {
            name: 'Manage Customers',
          },
        ]}
        className="custom-class"
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() => exportToCSV(data.users, 'customersCSV')}
        >
          Export
        </Button>
        <Button
          variant="contained"
          className="px-4 py-2"
          startIcon={<BiPlus />}
          onClick={() => {
            dispatch(openAddUserDialog());
          }}
        >
          add Costumer
        </Button>
      </PageHeader>
      <ManageCostumersTable />
      <AddUserDialog />
      <UpdateUserDialog />
    </Box>
  );
};

export default ManageCostumers;
