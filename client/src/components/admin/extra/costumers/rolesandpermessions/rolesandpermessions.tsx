import { Box, Button, Grid, CircularProgress } from '@mui/material';
import PageHeader from '../../../base/pageheader/PageHeader';
import { BiPlus } from 'react-icons/bi';
import RoleCard from '../../../base/roleCard/roleCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRolesWithUsers } from '../../../../../features/role/roleThunk';
import { AppDispatch, RootState } from '../../../../../app/store';
import { openAddRoleDialog } from '../../../../../features/role/roleSlice';
import AddRoleDialog from './AddRoleDialog';
import EditRoleDialog from './EditRoleDialog';
import RightDialog from './RightDialog';

const RolesAndPermissions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: roles,
    loading,
    error,
  } = useSelector((state: RootState) => state.roles.rolesWithUsers);

  useEffect(() => {
    dispatch(getRolesWithUsers());
  }, [dispatch]);

  // Function to determine role level based on role name or other criteria
  const getRoleLvl = (roleName: string): number => {
    const roleLevels: Record<string, number> = {
      Administrator: 1,
      Admin: 1,
      Editor: 2,
      Viewer: 3,
      User: 3,
    };
    return roleLevels[roleName] || 3; // Default to level 3 if not found
  };

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
          onClick={() => dispatch(openAddRoleDialog())}
        >
          Add Role
        </Button>
      </PageHeader>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" my={4} color="error.main">
          {error}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {roles?.map((role) => (
            <Grid item xs={12} sm={6} md={4} key={role.id}>
              <RoleCard
                roleName={role.name}
                roleLvl={role.rolelvl || getRoleLvl(role.name)}
                userTotal={role.userTotal || 0}
                usersAvatars={role.usersAvatars || []}
                id={role.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <AddRoleDialog />
      <EditRoleDialog />
      <RightDialog />
    </Box>
  );
};

export default RolesAndPermissions;
