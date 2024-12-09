import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Navbar from '../../components/extra/navbar/Navbar';
import Footer from '../../components/extra/footer/footer';

const Login = () => {
  return (
    <>
      <Navbar />
      <Box className="flex max-w-[1000px] gap-4 h-full my-20 m-auto items-center justify-center">
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
            <p className="text-end font-light text-secondary-lighter text-[12px] hover:text-primary-main hover:cursor-pointer hover:underline">
              Don't have an account? Register
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <img
          src="assets/images/Login_register.png"
          className="rounded w-0 md:w-[500px]"
        />
      </Box>
      <Footer />
    </>
  );
};

export default Login;
