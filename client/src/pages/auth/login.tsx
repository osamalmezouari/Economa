import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Login } from '../../features/auth/authThunk';
import { useRouter } from '@tanstack/react-router';
import { useAuth } from '../../context/AuthContext';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { login } = useAuth();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.auth.Login
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    const result = await dispatch(Login(loginData));
    if (result.payload) {
      // Use the login function from AuthContext instead of reloading
      login(result.payload as string);
      router.navigate({ to: '/Economa' });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          marginY: '40px',
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
            component={'form'}
            sx={{
              padding: '40px',
              width: { xs: '100%', md: '50%' },
            }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <Grid container spacing={2} className="justify-center items-center">
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
                    },
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', mb: 3 }}
                >
                  Sign in to continue to your account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  placeholder="Enter your email"
                  name="email"
                  defaultValue={''}
                  required={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdEmail color="#666" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
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
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  defaultValue={''}
                  required={true}
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
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 1,
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
              {/*           <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Typography
                variant="body2"
                onClick={() => router.navigate({ to: '/Economa/Register' })}
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
                Don't have an account? Register
              </Typography>
            </Box>
          </Grid> */}
              <Grid item xs={12}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
                    {error}
                  </Alert>
                )}
                {data.length > 0 && (
                  <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
                    Login successful! You can now access your account.
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
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
                    'Sign In'
                  )}
                </Button>

                {/*             <Divider sx={{ my: 3, color: 'text.secondary', fontSize: '12px' }}>
              Or continue with
            </Divider>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FaGoogle />}
                  sx={{
                    borderRadius: '10px',
                    py: 1,
                    textTransform: 'none',
                    borderColor: '#ddd',
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#ccc',
                    },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FaFacebook />}
                  sx={{
                    borderRadius: '10px',
                    py: 1,
                    textTransform: 'none',
                    borderColor: '#ddd',
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#ccc',
                    },
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid> */}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LoginComponent;
