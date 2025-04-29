import { Box } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import MakeRefillComponent from '../../components/user/extra/Refills/MakeRefill';

const MakeRefillPage = () => {
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Make Refills"
        breadcrumb={[
          { name: 'Profile', href: '/Economa/User/Make Refills' },
          { name: 'Refills' },
          {
            name: 'Make Refills',
          },
        ]}
        className="custom-Fclass"
      ></PageHeader>
      <MakeRefillComponent />
    </Box>
  );
};
export default MakeRefillPage;
