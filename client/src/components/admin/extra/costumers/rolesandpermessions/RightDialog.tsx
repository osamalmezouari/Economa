import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  CircularProgress,
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import {
  getPermissions,
  getRoleById,
  updateRolePermissions,
} from '../../../../../features/role/roleThunk';
import { Permission } from '../../../../../types/role';
import { closeRightDialog } from '../../../../../features/role/roleSlice';
import { CheckRounded } from '@mui/icons-material';

const EditRolePermessionsDialog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const roleId = useSelector((state: RootState) => state.roles.roleToEditId);
  const open = useSelector((state: RootState) => state.roles.isRightDialogOpen);
  const { data: permissions, loading: permissionsLoading } = useSelector(
    (state: RootState) => state.roles.permissions
  );
  const { data: roleData } = useSelector(
    (state: RootState) => state.roles.roleById
  );

  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([]);

  useEffect(() => {
    if (open) {
      dispatch(getPermissions());
      dispatch(getRoleById(roleId));
    }
  }, [dispatch, open, roleId]);

  useEffect(() => {
    if (roleData?.permissions) {
      setSelectedPermissions(roleData.permissions);
    }
  }, [roleData]);

  useEffect(() => {
    if (permissions && roleData?.permissions) {
      const rolePermissionIds = roleData.permissions.map((p) => p.id);
      const filteredPermissions = permissions.filter(
        (permission) => !rolePermissionIds.includes(permission.id)
      );
      setAvailablePermissions(filteredPermissions);
    }
  }, [permissions, roleData]);

  const handleClose = () => {
    dispatch(closeRightDialog());
  };

  const handleSave = async () => {
    await dispatch(
      updateRolePermissions({
        roleId,
        permissionIds: selectedPermissions.map((p) => p.id),
      })
    );
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage Role Permissions</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} className="mt-4">
            <Autocomplete
              className=""
              multiple
              options={availablePermissions || []}
              value={selectedPermissions.filter(
                (permission) =>
                  !roleData.permissions?.some((p) => p.id === permission.id)
              )}
              loading={permissionsLoading}
              getOptionLabel={(option) => option.name}
              onChange={(_, newValue) => setSelectedPermissions(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Available Permissions"
                  placeholder="Select permissions to add"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {permissionsLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                      background: '#fff',
                      padding: '0 8px',
                      zIndex: 1,
                      '&.Mui-focused': {
                        color: 'primary.main',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Current Permissions :
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {roleData?.permissions?.map((permission) => (
                  <Chip
                    key={permission.id}
                    label={permission.name}
                    variant="outlined"
                    size="small"
                    icon={<CheckRounded className="text-white" />}
                    className="bg-primary-main text-white rounded-[5px]"
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRolePermessionsDialog;
