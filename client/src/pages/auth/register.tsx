import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Navbar from '../../components/extra/navbar/Navbar';
import Footer from '../../components/extra/footer/footer';
import { RegisterPayload } from '../../types/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Register } from '../../features/auth/authThunk';
import { ApiError } from '../../types/error';

const RegisterComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.auth.Register
  );
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

  return (
    <>
      <Navbar />
      <Box
        component="form"
        className="flex max-w-[1000px] gap-4 h-full my-20 m-auto items-center justify-center"
        onSubmit={(e) => HandleSubmit(e)}
      >
        <img
          src="assets/images/Login_register.png"
          className="rounded w-0 md:w-[580px] h-full"
        />
        <Grid
          container
          spacing={1}
          className="justify-center items-center  p-4"
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h2" className="text-primary-main">
              Register
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Name"
              placeholder="Name"
              className="mb-4"
              type="text"
              defaultValue={''}
              required={false}
              name="name"
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
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              placeholder="Email"
              className="mb-4"
              defaultValue={''}
              required={true}
              type="email"
              name="email"
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
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              placeholder="Password"
              type="password"
              className="mb-4"
              defaultValue={''}
              required={true}
              name="password"
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
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Phone Number"
              placeholder="Ex : +212 600 000000 "
              className="mb-4"
              defaultValue={''}
              required={true}
              type="text"
              name="phoneNumber"
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
          <Grid item xs={12} sm={6} md={12} lg={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Address"
              placeholder="Address"
              className="mb-4"
              type="text"
              defaultValue={''}
              name="address"
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
            <p className="text-end font-light text-secondary-lighter text-[12px] hover:text-primary-main hover:cursor-pointer hover:underline">
              do you already have an account ? Login
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {error instanceof ApiError && (
              <Alert severity="error">{error.message}</Alert>
            )}
            {data.length > 0 && (
              <Alert severity="success">
                Registration successful! You will be redirected to the home
                page.
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              disabled={loading}
            >
              {loading && data.length === 0 ? (
                <CircularProgress size="30px" color="inherit" />
              ) : (
                'Register'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default RegisterComponent;
