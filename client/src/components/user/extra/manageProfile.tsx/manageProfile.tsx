import { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import {
  getShoortedUserInfo,
  getUserById,
  profileUpdate,
} from '../../../../features/user/userThunk';

const ManageProfileComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData, loading } = useSelector(
    (state: RootState) => state.user.ShoortedUserInfo
  );
  const { data: userDetails, loading: detailsLoading } = useSelector(
    (state: RootState) => state.user.ShoortedUserInfo
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getShoortedUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || '',
        email: userDetails.email || '',
        password: '',
        phoneNumber: userDetails.phoneNumber || '',
        address: userDetails.address || '',
      });
    }
  }, [userDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    };

    // Name validation
    if (formData.name && formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation (only if provided)
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Phone number validation (only if provided)
    if (
      formData.phoneNumber &&
      !/^\+?[0-9\s-]{8,}$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData || !userData.id) {
      setSnackbarMessage('User information not available');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      setSnackbarMessage('Please correct the errors in the form');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Only add fields that have values
      if (formData.name) formDataToSend.append('name', formData.name);
      if (formData.email) formDataToSend.append('email', formData.email);
      if (formData.password)
        formDataToSend.append('password', formData.password);
      if (formData.phoneNumber)
        formDataToSend.append('phoneNumber', formData.phoneNumber);
      if (formData.address) formDataToSend.append('address', formData.address);

      // Add file if selected
      if (file) formDataToSend.append('file', file);

      await dispatch(profileUpdate(formDataToSend));

      // Clear password field after successful update
      setFormData((prev) => ({ ...prev, password: '' }));

      setSnackbarMessage('Profile updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Refresh user data
      dispatch(getUserById(userData.id));
    } catch (error) {
      setSnackbarMessage('Failed to update profile');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (loading || detailsLoading) {
    return (
      <Box className="flex justify-center items-center h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={''}>
      {/* Profile Header with Avatar */}
      <Box className={'w-full relative h-[200px] bg-slate-200'}>
        <Box className={'ml-[100px] absolute -bottom-[80px]'}>
          <Avatar
            className="border-4 border-primary-main bg-white "
            sx={{ width: '160px', height: '160px' }}
            src={
              previewUrl ||
              userDetails?.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww'
            }
            alt={formData.name.charAt(0) || 'A'}
            onClick={() => fileInputRef.current?.click()}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <Typography className="text-center mt-2 text-sm text-gray-600">
            Click to change avatar
          </Typography>
        </Box>
      </Box>

      {/* Profile Form */}
      <Box className="mt-[100px] px-6 py-4">
        <Typography variant="h5" className="font-semibold mb-6">
          Profile Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                className="mb-4"
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                className="mb-4"
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                className="mb-4"
                placeholder="Enter new password to change"
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                className="mb-4"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                className="mb-4"
                multiline
                rows={3}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} className="flex justify-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="primary" />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageProfileComponent;
