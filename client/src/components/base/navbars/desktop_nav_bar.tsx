import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BiSearch } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import { BiStoreAlt } from 'react-icons/bi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { LuGitCompare } from 'react-icons/lu';
import { IoPersonOutline } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { TbShoppingBag } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { setDisplayWishlist } from '../../../features/wishlist/wishlistSlice';
import { useRouter } from '@tanstack/react-router';

const Desktop_nav_bar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <>
      <Stack className={'border-b-2 bg-gray'}>
        <Container style={{ maxWidth: '1200px' }}>
          <Grid container spacing={2} className={'px-8 items-center'}>
            {/* Logo */}
            <Grid size={2}>
              <Box
                component={'img'}
                src="/assets/images/logo.png"
                className="w-[140px] h-[140px] scale-[1.5] cursor-pointer"
                alt="logo"
                onClick={() => router.navigate({ to: '/' })}
              />
            </Grid>

            {/* Search Bar */}
            <Grid size={6}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for a product"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BiSearch
                        className={
                          'hover:bg-primary-main rounded-full w-8 h-8 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main '
                        }
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={4} className="flex justify-end gap-4">
              {/* Login */}
              <Button
                variant="text"
                className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2"
                startIcon={<IoPersonOutline />}
                onClick={() =>
                  router.navigate({
                    to: '/login',
                  })
                }
              >
                <p className="text-secondary-darker font-secondary">Login</p>
              </Button>
              <Button
                variant="text"
                className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2"
                startIcon={<GrFavorite />}
                onClick={() => {
                  dispatch({ type: 'setDisplayCart', payload: false });
                  dispatch(setDisplayWishlist());
                }}
              >
                <p className="text-secondary-darker font-secondary">Wishlist</p>
              </Button>

              {/* Cart */}
              <Button
                variant="text"
                className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2"
                startIcon={<TbShoppingBag />}
                onClick={() => {
                  dispatch({ type: 'setDisplayWishlist', payload: false });
                  dispatch(setDisplayCart());
                }}
              >
                <p className="text-secondary-darker font-secondary">Cart</p>
              </Button>
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
        {' '}
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<FiHome />}
          onClick={() => router.navigate({ to: '/' })}
        >
          <p className="text-secondary-darker font-main">Home</p>
        </Button>
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<BiStoreAlt />}
          /* onClick={() => router.navigate({ to: '/store' })} */
        >
          <p className="text-secondary-darker font-main">Store</p>
        </Button>
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<RiDiscountPercentLine />}
          /* onClick={() => router.navigate({ to: '/offers' })} */
        >
          <p className="text-secondary-darker font-main">Offers</p>
        </Button>
        <Button
          className="flex gap-2 w-28 bg-main-main ml-2 h-14"
          startIcon={<LuGitCompare />}
          onClick={() => router.navigate({ to: '/compare' })}
        >
          <p className="text-secondary-darker font-main">Compare</p>
        </Button>
      </Grid>
    </>
  );
};

export default Desktop_nav_bar;
