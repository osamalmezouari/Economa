import { useState, useLayoutEffect } from 'react';
import Desktop_nav_bar from '../../base/navbars/desktop_nav_bar';
import Mobile_nav_bar from '../../base/navbars/mobile_nav_bar';
import { FiHome } from 'react-icons/fi';
import { BiStoreAlt } from 'react-icons/bi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { LuGitCompare } from 'react-icons/lu';
import { IoPersonOutline } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { TbShoppingBag } from 'react-icons/tb';
import { logo } from '../../../mock/constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const NavItems = {
    itemsCenter: [
      { icon: <FiHome />, link: '#', name: 'home' },
      { icon: <BiStoreAlt />, link: '#', name: 'Store' },
      { icon: <RiDiscountPercentLine />, link: '#', name: 'Offers' },
      { icon: <LuGitCompare />, link: '#', name: 'Compare' },
    ],
    ItemsRight: [
      {
        icon: (
          <Button
            variant="text"
            className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2 "
            startIcon={<IoPersonOutline />}
          >
            <p className="text-secondary-darker font-secondary">Login</p>
          </Button>
        ),
        name: 'Login',
        link: '#',
      },
      {
        icon: (
          <Button
            variant="text"
            className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2 "
            startIcon={<GrFavorite />}
          >
            <p className="text-secondary-darker font-secondary">Wishlist</p>
          </Button>
        ),
        name: 'Wishlist',
        link: '#',
      },
      {
        icon: (
          <Button
            variant="text"
            className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2 "
            startIcon={<TbShoppingBag />}
            onClick={() => dispatch(setDisplayCart())}
          >
            <p className="text-secondary-darker font-secondary">cart</p>
          </Button>
        ),
        name: 'Cart',
        link: '#',
      },
    ],
    logo: logo,
    isOpen,
    setOpen,
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop ? (
    <Desktop_nav_bar NavItems={NavItems} />
  ) : (
    <Mobile_nav_bar NavItems={NavItems} />
  );
};

export default Navbar;
