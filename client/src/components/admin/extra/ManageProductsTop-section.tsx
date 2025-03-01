import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { PiTextColumns } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { ManageProduct } from '../../../types/product';
import { setManageFilter, setOpenFilter } from '../../../features/products/productSlice';

const ManageProductsTopsection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const parsedValue = type === 'number' ? Number(value) || 0 : value;
    dispatch(
      setManageFilter({ key: name as keyof ManageProduct, value: parsedValue })
    );
  };

  return (
    <>
      <Box className={'p-4 mt-4 flex justify-between items-center'}>
        <TextField
          className="w-[250px]"
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Search for a product"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <BiSearch
                  className={
                    'hover:bg-primary-main rounded-full w-6 h-6 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main '
                  }
                />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              fontSize: '12px',
            },
          }}
        />
        <Box className={'flex gap-4 items-center'}>
          <Button
            className="p-2 rounded-[3px] "
            variant="outlined"
            startIcon={<IoFilterCircleOutline size={20} />}
            onClick={() => dispatch(setOpenFilter())}
          >
            Filters
          </Button>
          <IconButton className="rounded-[3px] border-[1px] border-secondary-main">
            <PiTextColumns />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
export default ManageProductsTopsection;
