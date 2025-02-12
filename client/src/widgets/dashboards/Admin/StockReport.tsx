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
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getLowStockProducts } from '../../../features/StoreAnalytics/StoreAnalyticsThunk';

const StockReport = () => {
  const [filters, setFilters] = useState({
    page: 1,
    productName: '',
  });

  const [orderBy, setOrderBy] = useState<keyof (typeof data.products)[0] | ''>(
    ''
  );
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.StoreAnalytics.StockReport
  );

  useEffect(() => {
    dispatch(getLowStockProducts(filters));
  }, [filters, dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, productName: event.target.value, page: 1 });
  };

  const handlePageChange = (event: unknown, page: number) => {
    setFilters({ ...filters, page });
  };

  const handleRequestSort = (property: keyof (typeof data.products)[0]) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedProducts = [...data.products].sort((a, b) => {
    if (orderBy) {
      const valueA = a[orderBy] ?? '';
      const valueB = b[orderBy] ?? '';
      return order === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    }
    return 0;
  });

  const BorderLinearProgress = styled(LinearProgress)(
    ({ theme}) => ({
      height: 8,
      width: 100,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        /* backgroundColor:
          value <= 20
            ? '#ff0800'
            : value <= 40
              ? '#FF5733'
              : value <= 60
                ? '#fff033'
                : value <= 80
                  ? '#3371ff'
                  : '',*/
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
              value={filters.productName}
              onChange={handleSearchChange}
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
          </Box>
        }
      />
      <Table>
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell sortDirection={orderBy === 'id' ? order : false}>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={() => handleRequestSort('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'unit' ? order : false}>
              <TableSortLabel
                active={orderBy === 'unit'}
                direction={orderBy === 'unit' ? order : 'asc'}
                onClick={() => handleRequestSort('unit')}
              >
                Unit
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'stock' ? order : false}>
              <TableSortLabel
                active={orderBy === 'stock'}
                direction={orderBy === 'stock' ? order : 'asc'}
                onClick={() => handleRequestSort('stock')}
              >
                Stock
              </TableSortLabel>
            </TableCell>
            <TableCell>Cost Price</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProducts.map((product) => (
            <TableRow
              key={product.id}
              className="hover:bg-gray-50 transform transition-all duration-300"
            >
              <TableCell sx={{ width: '50px' }}>
                #{product.id.substring(0, 6)}...
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Avatar
                  sx={{ width: '55px', height: '55px' }}
                  className="rounded-none"
                  src={product.productImage}
                />
                <Box>
                  <Typography
                    variant="body1"
                    className="text-[14px] capitalize"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-[12px] text-gray-500"
                  >
                    {product.category}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{product.unit || '1kg'}</TableCell>
              <TableCell>
                <Box className="flex items-center gap-5">
                  <BorderLinearProgress
                    variant="determinate"
                    value={product.stock * 2}
                  />
                  <Typography variant="body2">{product.stock}</Typography>
                </Box>
              </TableCell>
              <TableCell>${product.costprice}</TableCell>
              <TableCell>
                <Box className="flex items-center gap-2">
                  <Rating size="small" value={product.rating} />
                  <Typography variant="body2">({product.reviews})</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="p-4 flex justify-end">
        <Pagination
          className="right-0"
          count={data.productPageCount}
          color="primary"
          page={filters.page}
          onChange={handlePageChange}
        />
      </Box>
    </Card>
  );
};

export default StockReport;
