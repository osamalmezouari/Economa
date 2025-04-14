import { Box, Button, Grid } from '@mui/material';
import PageHeader from '../../../base/pageheader/PageHeader';
import { BiPlus } from 'react-icons/bi';
import RoleCard from '../../../base/roleCard/roleCard';

const RolesAndPermissions = () => {
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Roles and Permissions"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'Roles' },
          {
            name: 'Manage Roles',
          },
        ]}
        className="custom-class"
      >
        <Button
          variant="contained"
          className="px-4 py-2"
          startIcon={<BiPlus />}
          onClick={() => {
            // Add role functionality
          }}
        >
          Add Role
        </Button>
      </PageHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RoleCard 
            roleName={'Administrator'} 
            roleLvl={1} 
            userTotal={10}
            usersAvatars={[
              'https://picsum.photos/50?random=1',
              'https://picsum.photos/50?random=2',
              'https://picsum.photos/50?random=3',
              'https://picsum.photos/50?random=4',
              'https://picsum.photos/50?random=5'
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RoleCard 
            roleName={'Editor'} 
            roleLvl={2} 
            userTotal={15}
            usersAvatars={[
              'https://picsum.photos/50?random=6',
              'https://picsum.photos/50?random=7',
              'https://picsum.photos/50?random=8'
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RoleCard 
            roleName={'Viewer'} 
            roleLvl={3} 
            userTotal={20}
            usersAvatars={[
              'https://picsum.photos/50?random=9',
              'https://picsum.photos/50?random=10'
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RolesAndPermissions;