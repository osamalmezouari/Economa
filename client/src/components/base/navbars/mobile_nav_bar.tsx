import { FaBars } from 'react-icons/fa6';
import { Badge, Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { FiHome } from 'react-icons/fi';
import { BiStoreAlt } from 'react-icons/bi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { LuGitCompare } from 'react-icons/lu';
import { IoPersonOutline } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { TbShoppingBag } from 'react-icons/tb';
import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { setFilters } from '../../../features/products/productSlice';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { setDisplayWishlist } from '../../../features/wishlist/wishlistSlice';
import { useAuth } from '../../../context/AuthContext';

const Mobile_nav_bar = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    setOpen(!isOpen);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ key: 'search', value: event.target.value }));
  };

  return (
    <>
      {/* Top Navigation: Right Section */}
      <Box
        component={'div'}
        className="bg-gray-200 relative z-30 p-4 flex justify-between items-center"
      >
        {/* Hamburger Menu */}
        <FaBars fontSize={26} onClick={handleClick} />

        {/* Right Items */}
        <Box component={'div'} className="flex gap-6">
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : isAuthenticated ? (
            <>
              {/* Profile when logged in */}
              <IoPersonOutline
                fontSize={24}
                className="cursor-pointer"
                onClick={() => router.navigate({ to:'/Economa' })}
              />
              
              {/* Wishlist */}
              <Badge badgeContent={3} color="primary">
                <GrFavorite
                  fontSize={24}
                  className="cursor-pointer"
                  onClick={() => dispatch(setDisplayWishlist())}
                />
              </Badge>

              {/* Cart */}
              <Badge badgeContent={5} color="primary">
                <TbShoppingBag
                  fontSize={24}
                  className="cursor-pointer"
                  onClick={() => dispatch(setDisplayCart())}
                />
              </Badge>
            </>
          ) : (
            /* Login when not authenticated */
            <IoPersonOutline
              fontSize={24}
              className="cursor-pointer"
              onClick={() => router.navigate({ to:'/Economa/login' })}
            />
          )}
        </Box>
      </Box>

      {/* Search and Logo */}
      <Box
        component={'div'}
        className="flex p-4 relative z-30 bg-white border-b-2 items-center justify-between"
      >
        {/* Logo */}
        <Box
          component={'img'}
          src="/path/to/logo.png"
          className="w-[80px] h-[80px] scale-[1.5]"
          alt="logo"
          onClick={() => router.navigate({ to:'/Economa' })}
        />

        {/* Search Bar */}
        <TextField
          className="w-[250px]"
          variant="outlined"
          placeholder="Search for a product"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search onClick={() => router.navigate({ to:'/Economa/Store' })} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Dropdown Center Navigation */}
      <Box
        component={'div'}
        className={`gap-x-4 absolute w-full p-2 bg-white z-20 transition-all duration-500 ease-in-out transform ${
          isOpen ? 'top-[200px] opacity-100' : '-top-[500px] opacity-0'
        }`}
      >
        {/* Home */}
        <Box
          component={'div'}
          className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          onClick={() => router.navigate({ to:'/Economa' })}
        >
          <FiHome fontSize={24} />
          <Box component={'div'}>Home</Box>
        </Box>

        {/* Store */}
        <Box
          component={'div'}
          className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          onClick={() => router.navigate({ to:'/Economa/Store' })}
        >
          <BiStoreAlt fontSize={24} />
          <Box component={'div'}>Store</Box>
        </Box>

        {/* Offers */}
        <Box
          component={'div'}
          className="flex items-center  gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          /* onClick={() => router.navigate({ to:'/Economa/offers' })} */
        >
          <RiDiscountPercentLine fontSize={24} />
          <Box component={'div'}>Offers</Box>
        </Box>

        {/* Compare */}
        <Box
          component={'div'}
          className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          onClick={() => router.navigate({ to:'/Economa/compare' })}
        >
          <LuGitCompare fontSize={24} />
          <Box component={'div'}>Compare</Box>
        </Box>
      </Box>
    </>
  );
};

export default Mobile_nav_bar;
