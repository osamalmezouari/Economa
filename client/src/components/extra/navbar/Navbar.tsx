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

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const NavItems = {
    itemsCenter: [
      { icon: <FiHome />, link: '#', name: 'home' },
      { icon: <BiStoreAlt />, link: '#', name: 'Store' },
      { icon: <RiDiscountPercentLine />, link: '#', name: 'Offers' },
      { icon: <LuGitCompare />, link: '#', name: 'Compare' },
    ],
    ItemsRight: [
      { icon: <IoPersonOutline fontSize={'25px'} />, name: 'Login', link: '#' },
      { icon: <GrFavorite fontSize={'25px'} />, name: 'Wishlist', link: '#' },
      { icon: <TbShoppingBag fontSize={'25px'} />, name: 'Cart', link: '#' },
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
