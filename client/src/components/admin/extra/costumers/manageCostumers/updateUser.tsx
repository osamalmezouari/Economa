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
import { MdOutlineCloudUpload } from 'react-icons/md';
import { closeUpdateUserDialog } from '../../../../../features/user/userSlice';
import { getRolesList } from '../../../../../features/role/roleThunk';
import {
  adminUpdate,
  getUserById,
  getUsersList,
} from '../../../../../features/user/userThunk';

type UpdateUser = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: string;
  file: File | null;
};

const UpdateUserDialog: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.userToEditId);
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => state.user.isEditUserOpen);

  const { loading: updateLoading, error: updateError } = useSelector(
    (state: RootState) => state.user.updateUser
  );
  const { data: roles } = useSelector((state: RootState) => state.roles.roles);
  const currentUserData = useSelector(
    (state: RootState) => state.user.getUserById.data
  );

  const [userData, setUserData] = useState<UpdateUser>({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: '',
    file: null,
  });

  useEffect(() => {
    if (currentUserData) {
      setUserData({
        name: currentUserData.name,
        email: currentUserData.email,
        role: currentUserData.roleId,
        phone: currentUserData.phoneNumber,
        address: currentUserData.address,
        password: currentUserData.password,
        file: null,
      });
    }
  }, [currentUserData]);

  useEffect(() => {
    dispatch(getRolesList());
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUserData((prev) => ({ ...prev, file }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (userData.file) formData.append('file', userData.file);
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('phoneNumber', userData.phone);
    formData.append('address', userData.address);
    formData.append('password', userData.password);
    formData.append('roleId', userData.role);

    try {
      await dispatch(adminUpdate({ id: userId, userData: formData }));
      await dispatch(getUsersList({ search: '', page: 1 }));
      dispatch(closeUpdateUserDialog());
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeUpdateUserDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={userData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={userData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={userData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              name="password"
              type="text"
              fullWidth
              value={userData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Role"
              name="role"
              fullWidth
              value={userData.role}
              onChange={handleChange}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<MdOutlineCloudUpload />}
            >
              Upload Avatar
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {userData.file && (
              <p style={{ marginLeft: 8, color: '#666' }}>
                {userData.file.name}
              </p>
            )}
          </Grid>
          <Grid item xs={12}>
            {updateError && <Alert severity="error">{updateError}</Alert>}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(closeUpdateUserDialog())}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="contained"
          disabled={updateLoading}
        >
          {updateLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserDialog;
