import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { closeAddRoleDialog } from '../../../../../features/role/roleSlice';
import {
  createRole,
  getRolesWithUsers,
} from '../../../../../features/role/roleThunk';
import { CreateRoleData } from '../../../../../types/role';

interface FormErrors {
  name?: string;
  description?: string;
}

const AddRoleDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.roles.openAddRoleDialog || false
  );
  const loading = useSelector(
    (state: RootState) => state.roles.CreateRole.loading
  );

  // Form state
  const [formData, setFormData] = useState<CreateRoleData>({
    name: '',
    description: '',
    rolelvl: 3,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) {
      setFormData({ name: '', description: '', rolelvl: 0 });
      setErrors({});
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(createRole(formData)).unwrap();
      await dispatch(getRolesWithUsers());
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };
  const handleClose = () => {
    dispatch(closeAddRoleDialog());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-role-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="add-role-dialog-title">Add Role</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <FormControl fullWidth error={!!errors.name} sx={{ mb: 2 }}>
            <TextField
              required
              id="name"
              name="name"
              label="Role Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              disabled={loading}
            />
            {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="rolelvl"
              name="rolelvl"
              label="Role lvl"
              value={formData.rolelvl}
              onChange={handleChange}
              fullWidth
              multiline
              rows={0}
              disabled={loading}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              disabled={loading}
            />
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Role'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoleDialog;
