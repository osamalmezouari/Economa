import { Height } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  InputAdornment,
  LinearProgress,
  linearProgressClasses,
  Pagination,
  Rating,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { BiSearch } from 'react-icons/bi';

const StockReport = () => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Bob', email: 'bob@example.com' },
    { id: 4, name: 'Bob', email: 'bob@example.com' },
    { id: 5, name: 'Bob', email: 'bob@example.com' },
    { id: 6, name: 'Bob', email: 'bob@example.com' },
  ];
  const BorderLinearProgress = styled(LinearProgress)(
    ({ theme, value }: { value: number }) => ({
      height: 8,
      width: 100,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor:
          value <= 20
            ? '#ff0800'
            : value <= 40
              ? '#FF5733'
              : value <= 60
                ? '#fff033'
                : value <= 80
                  ? '#3371ff'
                  : '',
      },
    })
  );

  return (
    <Card className="mt-6 mb-6 rounded-[5px] border-[1px] shadow-none px-4 relative">
      <CardHeader
        className="h-24 p-0"
        title={
          <Box className={'flex justify-between'}>
            <Typography variant="h5">Stock Report</Typography>
            <TextField
              className="w-[200px]"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Search for a product"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <BiSearch
                      className={
                        'hover:bg-primary-main  rounded-full w-6 h-6 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main '
                      }
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '12px', // Replace with the desired size
                },
              }}
            />
          </Box>
        }
      />

      <Table>
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell sx={{ width: '50px' }}>ID</TableCell>
            <TableCell sx={{ width: '200px' }}>Name</TableCell>
            <TableCell sx={{ width: '80px' }}>Unit</TableCell>
            <TableCell sx={{ width: '150px' }}>Stock</TableCell>
            <TableCell sx={{ width: '100px' }}>Price</TableCell>
            <TableCell sx={{ width: '150px' }}>Rating</TableCell>
            <TableCell sx={{ width: '50px' }}>Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 transform transition-all duration-300"
            >
              <TableCell sx={{ width: '50px' }}>#{user.id}</TableCell>
              <TableCell
                sx={{ width: '200px' }}
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: '55px', height: '55px' }}
                  className="rounded-none"
                />
                <Box>
                  <Typography
                    variant="body1"
                    className="text-[14px] capitalize"
                  >
                    sweet peppers
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-[12px] text-gray-500"
                  >
                    fast food
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '80px' }}>1kg</TableCell>
              <TableCell sx={{ width: '150px' }}>
                <Box className={'flex items-center gap-5'}>
                  <BorderLinearProgress variant="determinate" value={20} />
                  <Typography variant="body2">20</Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '100px' }}>50$</TableCell>
              <TableCell sx={{ width: '150px' }} className="">
                <Box className={'flex items-center gap-2'}>
                  <Rating size="small" />
                  <Typography variant="body2">(10)</Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '50px' }}>10%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className={'p-4 flex justify-end'}>
        <Pagination className="right-0" count={10} color="primary" />
      </Box>
    </Card>
  );
};
export default StockReport;
