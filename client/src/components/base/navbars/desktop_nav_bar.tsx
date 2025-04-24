import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BiSearch } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import { BiStoreAlt } from 'react-icons/bi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { LuGitCompare } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { setDisplayWishlist } from '../../../features/wishlist/wishlistSlice';
import { useRouter } from '@tanstack/react-router';
import { setFilters } from '../../../features/products/productSlice';
import Logo from '../../icons/logo';
import Account from '../../icons/Account';
import ShoopingCart from '../../icons/shoopingCart';
import Favorite from '../../icons/favorite';
import { useAuth } from '../../../context/AuthContext';
import ProfileMenu from '../../admin/base/ProfileMenu';

const Desktop_nav_bar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ key: 'search', value: event.target.value }));
  };

  return (
    <>
      <Stack className={'border-b-2 bg-gray'}>
        <Container style={{ maxWidth: '1300px' }}>
          <Grid container spacing={2} className={' items-center h-24'}>
            <Grid size={2.5}>
              <Logo />
            </Grid>

            <Grid size={7}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for a product"
                onChange={handleSearchChange}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BiSearch
                        onClick={() =>
                          router.navigate({ to: '/Economa/Store' })
                        }
                        className={
                          ' rounded-full w-4 h-4  text-secondary-main transition-all duration-500 ease-in-out cursor-pointer hover:text-primary-main   '
                        }
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={2} className=" flex ml-8 gap-4 items-center">
              {isLoading ? (
                <Box className="ml-auto    flex items-center">
                  <Typography variant="body2" className="font-Inria">
                    Loading...
                  </Typography>
                </Box>
              ) : isAuthenticated ? (
                <>
                  <ProfileMenu />
                  <IconButton
                    onClick={() => {
                      dispatch({ type: 'setDisplayCart', payload: false });
                      dispatch(setDisplayWishlist());
                    }}
                    className="  cursor-pointer p-2 text-primary-main w-10 h-10"
                  >
                    <Favorite className="h-6 w-6" />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      dispatch({ type: 'setDisplayWishlist', payload: false });
                      dispatch(setDisplayCart());
                    }}
                    className="  cursor-pointer p-2 text-primary-main w-10 h-10"
                  >
                    <ShoopingCart className="h-6 w-6 " />
                  </IconButton>
                </>
              ) : (
                <Box
                  onClick={() => {
                    router.navigate({
                      to: '/Economa/login',
                    });
                  }}
                  className="ml-auto mr-4 cursor-pointer"
                >
                  <Box className={'flex flex-col items-center'}>
                    <Account className="h-6 w-6" />
                    <Typography
                      variant="body2"
                      className="font-bold font-Inria mt-1"
                    >
                      Account
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Stack>

      <Grid
        container
        sx={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          borderBottom: '1px',
          borderColor: '#C4CDD5',
          borderStyle: 'solid',
        }}
      >
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<FiHome />}
          onClick={() => router.navigate({ to: '/Economa' })}
        >
          <p className="text-secondary-darker font-main">Home</p>
        </Button>
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<BiStoreAlt />}
          onClick={() => router.navigate({ to: '/Economa/Store' })}
        >
          <p className="text-secondary-darker font-main">Store</p>
        </Button>
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<RiDiscountPercentLine />}
        >
          <p className="text-secondary-darker font-main">Offers</p>
        </Button>
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<LuGitCompare />}
          onClick={() => router.navigate({ to: '/Economa/compare' })}
        >
          <p className="text-secondary-darker font-main">Compare</p>
        </Button>
      </Grid>
    </>
  );
};

export default Desktop_nav_bar;
