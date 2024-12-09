import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Navbar from '../../components/extra/navbar/Navbar';
import Footer from '../../components/extra/footer/footer';

const Register = () => {
  return (
    <>
      <Navbar />
      <Box className="flex max-w-[1000px] gap-4 h-full my-20 m-auto items-center justify-center">
        <Grid
          container
          spacing={1}
          className="justify-center items-center  p-4"
        >
          <Grid item  xs={12} sm={12} md={12} lg={12}>
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
              defaultValue={''}
              required={false}
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
              placeholder="Phone Number"
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
          <Grid item xs={12} sm={6} md={12} lg={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Address"
              placeholder="Address"
              className="mb-4"
              defaultValue={''}
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

export default Register;
