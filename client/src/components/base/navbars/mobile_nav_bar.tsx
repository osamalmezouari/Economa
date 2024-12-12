import { useNavigate } from 'react-router-dom';
import { NavItemsProps } from './interfaces';
import { FaBars } from 'react-icons/fa6';
import { Badge, Box, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const Mobile_nav_bar = ({ NavItems }: NavItemsProps) => {
  const navigate = useNavigate();
  const handleclick = () => {
    console.log(NavItems.isOpen);

    NavItems.setOpen && NavItems.setOpen(!NavItems.isOpen);
  };
  return (
    <>
      <Box
        component={'div'}
        className="bg-gray-200 relative z-30 p-4 flex justify-between items-center"
      >
        <FaBars
          fontSize={26}
          onClick={() => NavItems.setOpen && handleclick()}
        />
        <Box component={'div'} className="flex gap-6">
          {NavItems.ItemsRight.map((item) => {
            return  item.icon;
          })}
        </Box>
      </Box>
      <Box
        component={'div'}
        className="flex p-4 relative z-30 bg-white border-b-2 items-center justify-between"
      >
        <Box
          component={'img'}
          src={NavItems.logo}
          className="w-[80px] h-[80px] scale-[1.5]"
          alt="logo"
        />
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
      {
        <Box
          component={'div'}
          className={`gap-x-4 absolute w-full p-2 bg-white z-20 transition-all duration-500 ease-in-out transform ${
            NavItems.isOpen
              ? 'top-[200px] opacity-100 '
              : '-top-[500px] opacity-0'
          }`}
        >
          {NavItems.itemsCenter.map((item) => {
            return (
              <Box
                component={'div'}
                className="flex items-center gap-4 border-y-1 p-4 hover:bg-primary-main hover:text-white transition-all duration-500 "
              >
                {item.icon}
                <Box component={'div'} onClick={() => navigate(item.link)}>
                  {item.name}
                </Box>
              </Box>
            );
          })}
        </Box>
      }
    </>
  );
};

export default Mobile_nav_bar;
