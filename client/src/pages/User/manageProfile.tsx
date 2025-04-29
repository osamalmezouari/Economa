import { Box } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import ManageProfileComponent from '../../components/user/extra/manageProfile.tsx/manageProfile';

const ManageProfile = () => {
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Manage Profile"
        breadcrumb={[
          { name: 'Profile', href: '/Economa/User/Profile' },
          { name: 'My Profile' },
          {
            name: 'Manage Profile',
          },
        ]}
        className="custom-class"
      ></PageHeader>
      <ManageProfileComponent />
    </Box>
  );
};
export default ManageProfile;
