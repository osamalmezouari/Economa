import {
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BiSearch, BiSolidUserCircle } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import { BiStoreAlt } from 'react-icons/bi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { LuGitCompare } from 'react-icons/lu';
import { IoBookmark } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { setDisplayWishlist } from '../../../features/wishlist/wishlistSlice';
import { useRouter } from '@tanstack/react-router';
import { setFilters } from '../../../features/products/productSlice';
import { FaBasketShopping, FaWallet } from 'react-icons/fa6';
import Logo from '../../icons/logo';

const Desktop_nav_bar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ key: 'search', value: event.target.value }));
  };

  return (
    <>
      <Stack className={'border-b-2 bg-gray'}>
        <Container style={{ maxWidth: '1300px' }}>
          <Grid
            container
            spacing={2}
            className={' items-center justify-between h-24'}
          >
            {/* Logo */}
            <Grid size={2.5}>
              <Logo />
            </Grid>

            {/* Search Bar */}
            <Grid size={5.5}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for a product"
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BiSearch
                        onClick={() =>
                          router.navigate({ to: '/Economa/Store' })
                        }
                        className={
                          'hover:bg-primary-main rounded-full w-8 h-8 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main '
                        }
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={4} className="flex justify-end gap-2">
              {/* Login */}
              <Button
                variant="outlined"
                onClick={() =>
                  router.navigate({
                    to: '/Economa/login',
                  })
                }
                sx={{ borderRadius: '4px', color: 'primary.main' }}
              >
                <BiSolidUserCircle className="w-4 h-10  text-primary-main"></BiSolidUserCircle>
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch({ type: 'setDisplayCart', payload: false });
                  dispatch(setDisplayWishlist());
                }}
                sx={{ borderRadius: '4px' }}
              >
                <IoBookmark className="w-4 h-6  text-primary-main"></IoBookmark>
              </Button>

              {/* Cart */}
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch({ type: 'setDisplayWishlist', payload: false });
                  dispatch(setDisplayCart());
                }}
                sx={{ borderRadius: '4px' }}
              >
                <FaBasketShopping className="w-4 h-10 text-primary-main "></FaBasketShopping>
              </Button>
              <Button
                variant="contained"
                startIcon={<FaWallet className="w-4 h-4" />}
                className="text-start"
                onClick={() =>
                  router.navigate({ to: '/Economa/Refill_Balance' })
                }
                sx={{ fontSize: '12px', borderRadius: '2px' }}
              >
                Refil balance
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
          /* onClick={() => router.navigate({ to:'/Economa/offers' })} */
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
