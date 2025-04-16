import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import {
  getRoleById,
  updateRole,
} from '../../../../../features/role/roleThunk';
import { UpdateRoleData } from '../../../../../types/role';
import { closeEditRoleDialog } from '../../../../../features/role/roleSlice';

const EditRoleDialog: React.FC = () => {
  const roleId = useSelector((state: RootState) => state.roles.roleToEditId);
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => state.roles.isEditRoleOpen);

  const { loading: updateLoading, error: updateError } = useSelector(
    (state: RootState) => state.roles.updateRole
  );
  const targetRoleData = useSelector(
    (state: RootState) => state.roles.roleById.data
  );

  const [role, setRole] = useState<UpdateRoleData>({
    name: '',
    description: '',
    rolelvl: 0,
  });

  useEffect(() => {
    dispatch(getRoleById(roleId));
  }, [dispatch, roleId]);

  useEffect(() => {
    if (targetRoleData) {
      setRole({
        name: targetRoleData.name || '',
        description: targetRoleData.description || '',
        rolelvl: targetRoleData.rolelvl || 0,
      });
    }
  }, [targetRoleData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRole((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    await dispatch(updateRole({ roleId, roleData: role }));
    dispatch(closeEditRoleDialog());
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeEditRoleDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Role</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="dense"
              value={role.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Role Level"
              name="rolelvl"
              fullWidth
              margin="dense"
              value={role.rolelvl}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="dense"
              value={role.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          {updateError && (
            <Grid item xs={12}>
              <Alert severity="error">{updateError}</Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeEditRoleDialog())}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" disabled={updateLoading}>
          {updateLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoleDialog;
