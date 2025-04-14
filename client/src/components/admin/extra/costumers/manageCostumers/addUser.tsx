import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { createUser } from '../../../../../types/user';
import { MdOutlineCloudUpload } from 'react-icons/md';
import {
  adminCreate,
  getUsersList,
} from '../../../../../features/user/userThunk';
import { closeAddUserDialog } from '../../../../../features/user/userSlice';
import { getRolesList } from '../../../../../features/role/roleThunk';

const AddUserDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => state.user.isAddUserOpen);
  const { loading: createLoading, error: createError } = useSelector(
    (state: RootState) => state.user.createUser
  );
  const { data: roles, loading: rolesLoading } = useSelector(
    (state: RootState) => state.roles.roles
  );

  const [user, setUser] = useState<createUser>({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    roleId: '',
    file: null,
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUser((prev) => ({ ...prev, file }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();

    // Append user fields to FormData
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('address', user.address);
    formData.append('roleId', user.roleId);
    formData.append('password', user.password);
    formData.append('file', user.file);
    await dispatch(adminCreate(formData));
    dispatch(closeAddUserDialog());
    await dispatch(getUsersList({ page: 1, search: '' }));
  };
  useEffect(() => {
    dispatch(getRolesList());
  }, [dispatch]);
  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeAddUserDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              name="name"
              type="text"
              fullWidth
              margin="dense"
              value={user.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="dense"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              type="text"
              margin="dense"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              type="text"
              margin="dense"
              value={user.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="dense"
              value={user.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select name="roleId" value={user.roleId} onChange={handleChange}>
                {rolesLoading ? (
                  <MenuItem disabled>Loading roles...</MenuItem>
                ) : (
                  roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* File Upload Section */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              color="primary"
              className="w-max"
              startIcon={<MdOutlineCloudUpload />}
              sx={{ borderRadius: '5px' }}
            >
              Upload Avatar
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {user.file && (
              <p className="mt-2 text-gray-500">{user.file.name}</p>
            )}
          </Grid>

          {createError && (
            <Grid item xs={12}>
              <Alert severity="error">{createError}</Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => dispatch(closeAddUserDialog())}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" disabled={createLoading}>
          {createLoading ? <CircularProgress size={24} /> : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
