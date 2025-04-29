import { Box } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import MakeTransferComponent from '../../components/user/extra/manageTransfers/MakeTransfer';

const MakeTransferPage = () => {
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="My Transfers"
        breadcrumb={[
          { name: 'Profile', href: '/Economa/User/Make Refills' },
          { name: 'Refills' },
          {
            name: 'Make Transfers',
          },
        ]}
        className="custom-Fclass"
      ></PageHeader>
      <MakeTransferComponent />
    </Box>
  );
};

export default MakeTransferPage;