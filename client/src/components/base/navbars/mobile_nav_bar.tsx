import { FaBars } from 'react-icons/fa6';
import { Badge, Box, InputAdornment, TextField } from '@mui/material';
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

const Mobile_nav_bar = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!isOpen);
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
          {/* Login */}
          <IoPersonOutline
            fontSize={24}
            className="cursor-pointer"
            onClick={() => router.navigate({ to: '/login' })}
          />

          {/* Wishlist */}
          <Badge badgeContent={3} color="primary">
            <GrFavorite
              fontSize={24}
              className="cursor-pointer"
              onClick={() => console.log('Open Wishlist')}
            />
          </Badge>

          {/* Cart */}
          <Badge badgeContent={5} color="primary">
            <TbShoppingBag
              fontSize={24}
              className="cursor-pointer"
              onClick={() => console.log('Open Cart')}
            />
          </Badge>
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
          onClick={() => router.navigate({ to: '/' })}
        />

        {/* Search Bar */}
        <TextField
          className="w-[250px]"
          variant="outlined"
          placeholder="Search for a product"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Dropdown Center Navigation */}
      <Box
        component={'div'}
        className={`gap-x-4 absolute w-full p-2 bg-white z-20 transition-all duration-500 ease-in-out transform ${isOpen ? 'top-[200px] opacity-100' : '-top-[500px] opacity-0'
          }`}
      >
        {/* Home */}
        <Box
          component={'div'}
          className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          onClick={() => router.navigate({ to: '/' })}
        >
          <FiHome fontSize={24} />
          <Box component={'div'}>Home</Box>
        </Box>

        {/* Store */}
        <Box
          component={'div'}
          className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          onClick={() => router.navigate({ to: '/Store' })}
        >
          <BiStoreAlt fontSize={24} />
          <Box component={'div'}>Store</Box>
        </Box>

        {/* Offers */}
        <Box
          component={'div'}
          className="flex items-center  gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
        /* onClick={() => router.navigate({ to: '/offers' })} */
        >
          <RiDiscountPercentLine fontSize={24} />
          <Box component={'div'}>Offers</Box>
        </Box>

        {/* Compare */}
        <Box
          component={'div'}
          className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 cursor-pointer"
          onClick={() => router.navigate({ to: "/compare" })}
        >
          <LuGitCompare fontSize={24} />
          <Box component={'div'}>Compare</Box>
        </Box>
      </Box>
    </>
  );
};

export default Mobile_nav_bar;
