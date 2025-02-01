import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { ApiError } from '../../types/apierror';
import { Login } from '../../features/auth/authThunk';
import { useRouter } from '@tanstack/react-router';

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.auth.Login
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    await dispatch(Login(loginData));
  };
  const Router = useRouter();

  return (
    <>
      <Box
        component={'form'}
        className="flex max-w-[1000px] gap-4 h-full my-20 m-auto items-center justify-center"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <img
          src="/assets/images/Login_register.png"
          className="rounded w-0 md:w-[500px]"
        />
        <Grid container spacing={1} className="justify-center items-center p-4">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h2" className="text-primary-main">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              placeholder="Email"
              className="mb-4"
              name="email"
              defaultValue={''}
              required={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.light,
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              className="mb-4"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.light,
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
              defaultValue={''}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <p
              onClick={() => Router.navigate({ to:'/Economa/Register' })}
              className="text-end font-light text-secondary-lighter text-[12px] hover:text-primary-main hover:cursor-pointer hover:underline"
            >
              Don't have an account? Register
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {error instanceof ApiError && (
              <Alert severity="error">{error.message}</Alert>
            )}
            {data.length > 0 && (
              <Alert severity="success">
                Login successful! You can now access your account.
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              type="submit"
              disabled={loading}
            >
              {loading && data.length === 0 ? (
                <CircularProgress size="30px" color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginComponent;
