import { Avatar, Badge, Box, IconButton } from '@mui/material';

import { PiCommand, PiMagnifyingGlassBold } from 'react-icons/pi';
import RingBellSolidIcon from '../../icons/ring-bell-solid';
import ChatSolidIcon from '../../icons/chat-solid';
import ScanQrCodeIcon from '../../icons/scanqrcode';
import LanguageSwitcherIcon from '../../icons/langugaeSwitcher';

const Header = () => {
  /*
  const router = useRouter();
*/
  return (
    <Box className="fixed top-0 flex justify-between px-8 py-8 bg-gray-0/80 z-50 w-[calc(100%-290px)] h-20 bg-opacity-20 items-center backdrop-blur">
      <Box className={'w-4/12 hover:pt-[1px]'}>
        <button
          /*   onClick={() => setOpen(true)} */
          className={
            'group inline-flex items-center group focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm xl:rounded-xl xl:border xl:border-gray-200 xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm xl:backdrop-blur-md xl:transition-colors xl:duration-200 xl:hover:border-gray-900 xl:hover:outline-double xl:hover:outline-[0.5px] xl:hover:outline-gray-900 xl:focus-visible:border-gray-900 xl:focus-visible:outline-double xl:focus-visible:outline-[0.5px] xl:focus-visible:outline-gray-900'
            /* className */
          }
        >
          <PiMagnifyingGlassBold className="magnifying-glass me-2 h-[18px] w-[18px]" />
          <span className="placeholder-text hidden text-sm text-gray-600 group-hover:text-gray-900 xl:inline-flex">
            Type what you are looking for...
          </span>
          <span className="search-command ms-auto hidden items-center text-sm text-white bg-primary-main lg:flex lg:rounded-md  lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold xl:justify-normal">
            <PiCommand strokeWidth={1.3} className="h-[15px] w-[15px]" />K
          </span>
        </button>
      </Box>

      <Box className={'flex items-center gap-5'}>
        <IconButton className="group !rounded !bg-white !drop-shadow-sm">
          <Badge
            badgeContent=""
            color="warning"
            className=""
            sx={{
              '& .MuiBadge-badge': {
                minWidth: '10px',
                height: '10px',
                padding: 0,
                borderRadius: '50%',
                border: '2px solid white',
                right: '2px',
                top: '4px',
              },
            }}
          >
            <RingBellSolidIcon className="h-[20px] text-black w-auto group-hover:text-primary-main transition-all" />
          </Badge>
        </IconButton>
{/*         <IconButton className="group !rounded !bg-white !drop-shadow-sm">
          <Badge
            badgeContent=""
            color="warning"
            className=""
            sx={{
              '& .MuiBadge-badge': {
                minWidth: '10px',
                height: '10px',
                padding: 0,
                borderRadius: '50%',
                border: '2px solid white',
                right: '2px',
                top: '4px',
              },
            }}
          >
            <ChatSolidIcon className="h-[20px] text-black w-auto group-hover:text-primary-main transition-all" />
          </Badge>
        </IconButton> */}
        <IconButton className="group !rounded !bg-white !drop-shadow-sm">
          <Badge
            badgeContent=""
            color="warning"
            className=""
            sx={{
              '& .MuiBadge-badge': {
                minWidth: '10px',
                height: '10px',
                padding: 0,
                borderRadius: '50%',
                border: '2px solid white',
                right: '2px',
                top: '4px',
              },
            }}
          >
            <ScanQrCodeIcon className="h-[20px] text-black w-auto group-hover:text-primary-main transition-all" />
          </Badge>
        </IconButton>
        <IconButton className="!bg-white !rounded !drop-shadow-sm">
          <LanguageSwitcherIcon className="h-[24px] w-auto" />
        </IconButton>
        <IconButton className="!bg-white !drop-shadow-sm">
          <Avatar
            sx={{ width: 40, height: 40 }}
            src="https://isomorphic-furyroad.vercel.app/avatar.webp"
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
