import { Box } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import RefillsComponent from '../../components/user/extra/Refills/Refills';

const Refills = () => {
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="My Refills"
        breadcrumb={[
          { name: 'Profile', href: '/Economa/User/My Refills' },
          { name: 'Refills' },  
          {
            name: 'My Refills',
          },
        ]}
        className="custom-Fclass"
      ></PageHeader>
      <RefillsComponent />
    </Box>
  );
};
export default Refills;
