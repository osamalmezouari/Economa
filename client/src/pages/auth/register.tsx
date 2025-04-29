import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { RegisterPayload } from '../../types/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Register } from '../../features/auth/authThunk';
import { useRouter } from '@tanstack/react-router';
import { MdEmail, MdLock, MdPerson, MdPhone, MdHome, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';

const RegisterComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.auth.Register
  );
  const [showPassword, setShowPassword] = useState(false);
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRegistredUser: RegisterPayload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      address: formData.get('address') as string,
    };
    await dispatch(Register(newRegistredUser));
  };
  const Router = useRouter();
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            maxWidth: '1000px',
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            background: 'white',
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '50%',
              backgroundImage: 'url("/assets/images/Login_register.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box
            component="form"
            sx={{
              padding: '40px',
              width: { xs: '100%', md: '50%' },
              overflowY: 'auto',
              maxHeight: '90vh',
            }}
            onSubmit={(e) => HandleSubmit(e)}
          >
            <Grid
              container
              spacing={2}
              className="justify-center items-center"
            >
          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              className="text-primary-main"
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  backgroundColor: 'primary.main',
                  borderRadius: '2px',
                }
              }}
            >
              Create Account
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 3 }}
            >
              Sign up to get started with Economa
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Name"
              placeholder="Enter your name"
              type="text"
              defaultValue={''}
              required={false}
              name="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdPerson color="#666" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              placeholder="Enter your email"
              defaultValue={''}
              required={true}
              type="email"
              name="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail color="#666" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              placeholder="Create a password"
              type={showPassword ? 'text' : 'password'}
              defaultValue={''}
              required={true}
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock color="#666" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Phone Number"
              placeholder="Ex : +212 600 000000 "
              defaultValue={''}
              required={true}
              type="text"
              name="phoneNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdPhone color="#666" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Address"
              placeholder="Enter your address"
              type="text"
              defaultValue={''}
              name="address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdHome color="#666" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Typography
                variant="body2"
                onClick={() => Router.navigate({ to: '/Economa/login' })}
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                Already have an account? Login
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>{error}</Alert>
            )}
            {data.length > 0 && (
              <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
                Registration successful! You will be redirected to the home
                page.
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {loading && data.length === 0 ? (
                <CircularProgress size="24px" color="inherit" />
              ) : (
                'Create Account'
              )}
            </Button>
            
            <Divider sx={{ my: 3, color: 'text.secondary', fontSize: '12px' }}>
              By registering, you agree to our Terms and Privacy Policy
            </Divider>
          </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterComponent;
