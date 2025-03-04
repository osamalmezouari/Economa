import { useState, useLayoutEffect } from 'react';
import Desktop_nav_bar from '../base/navbars/desktop_nav_bar';
import Mobile_nav_bar from '../base/navbars/mobile_nav_bar';


const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop ? (
    <Desktop_nav_bar />
  ) : (
    <Mobile_nav_bar />
  );
};

export default Navbar;
