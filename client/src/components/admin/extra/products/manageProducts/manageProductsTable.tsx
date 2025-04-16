import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Checkbox,
  Grid2,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { useEffect, useState } from 'react';
import { getManageProductsTable } from '../../../../../features/products/productThunk';
import { ManageProduct } from '../../../../../types/product';
import {
  addStockTransactionOpen,
  openupdateProductDialog,
  setManageFilter,
  setOpenFilter,
  setProductIdToEdit,
} from '../../../../../features/products/productSlice';
import { FiEdit3 } from 'react-icons/fi';
import { PiTextColumns } from 'react-icons/pi';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineInboxIn } from 'react-icons/hi';

const ManageProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.products.productsManage
  );
  const { products, productspageCount } = data;
  const [search, setSearch] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({
    id: true,
    product: true,
    cost: true,
    price: true,
    discounted: true,
    stock: true,
    description: true,
    unit: true,
    rating: true,
    actions: true,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setManageFilter({ key: 'page', value }));
  };

  const filters = useSelector(
    (state: RootState) => state.products.manageProductsFilters.filters
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    dispatch(setManageFilter({ key: 'search', value: search }));
    //await dispatch(getManageProductsTable(filters));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColumnVisibilityChange =
    (column: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setColumnVisibility((prevState) => ({
        ...prevState,
        [column]: event.target.checked,
      }));
    };

  useEffect(() => {
    dispatch(getManageProductsTable(filters));
  }, [dispatch, filters]);

  return (
    <>
      <Box className={'p-4 mt-4 flex justify-between items-center '}>
        <TextField
          className="w-[250px]"
          variant="outlined"
          fullWidth
          size="small"
          name="search"
          placeholder="Search for a product"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress color="primary" className="" size={15} />
                ) : (
                  <BiSearch
                    onClick={handleSearch}
                    className={
                      'hover:bg-primary-main rounded-full w-6 h-6 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main '
                    }
                  />
                )}
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
          <IconButton
            className="rounded-[3px] border-[1px] border-secondary-main"
            onClick={handleMenuClick}
          >
            <PiTextColumns />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="mt-2"
          >
            <Grid2 container spacing={2} className={'w-[300px] p-2'}>
              {[
                'id',
                'product',
                'cost',
                'price',
                'discounted',
                'stock',
                'description',
                'unit',
                'rating',
                'actions',
              ].map((column) => (
                <Grid2 size={6}>
                  <MenuItem key={column}>
                    <Checkbox
                      checked={columnVisibility[column]}
                      onChange={handleColumnVisibilityChange(column)}
                    />
                    <Typography variant="body2">{column}</Typography>
                  </MenuItem>
                </Grid2>
              ))}
            </Grid2>
          </Menu>
        </Box>
      </Box>
      <Table className=" mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow className="py-2">
            {columnVisibility.id && (
              <TableCell className="py-2 h-6">ID</TableCell>
            )}
            {columnVisibility.product && (
              <TableCell className="py-2 h-8">Product</TableCell>
            )}
            {columnVisibility.cost && (
              <TableCell className="py-2 h-6">Cost</TableCell>
            )}
            {columnVisibility.price && (
              <TableCell className="py-2 h-6">Price</TableCell>
            )}
            {columnVisibility.discounted && (
              <TableCell className="py-2 h-6">Discounted</TableCell>
            )}
            {columnVisibility.stock && (
              <TableCell className="py-2 h-6">Stock</TableCell>
            )}
            {columnVisibility.description && (
              <TableCell className="py-2 h-6">Description</TableCell>
            )}
            {columnVisibility.unit && (
              <TableCell className="py-2 h-6">Unit</TableCell>
            )}
            {columnVisibility.rating && (
              <TableCell className="py-2 h-6">Rating</TableCell>
            )}
            {columnVisibility.actions && (
              <TableCell className="py-2 h-6"></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: ManageProduct) => (
            <TableRow key={product.id} className="hover:bg-gray-50">
              {columnVisibility.id && (
                <TableCell sx={{ width: '50px' }}>
                  #{product.id.substring(0, 6)}...
                </TableCell>
              )}
              {columnVisibility.product && (
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      src={product.imageLink || ''}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        className="text-[14px] font-medium"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-[12px] text-gray-500"
                      >
                        {product.categoryName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              )}
              {columnVisibility.cost && (
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    ${product.costprice.toFixed(2)}
                  </Typography>
                </TableCell>
              )}
              {columnVisibility.price && (
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </TableCell>
              )}
              {columnVisibility.discounted && (
                <TableCell>
                  <Typography
                    variant="body2"
                    className="text-center"
                    fontWeight={500}
                  >
                    ${product.priceWithDiscount.toFixed(2)}
                  </Typography>
                </TableCell>
              )}
              {columnVisibility.stock && (
                <TableCell>
                  <Typography variant="body2" className="text-[10px]">
                    <Chip
                      color="primary"
                      className="h-4"
                      label={<p className="text-[10px]">{product.stock}</p>}
                    />
                  </Typography>
                </TableCell>
              )}
              {columnVisibility.description && (
                <TableCell>
                  <Typography
                    variant="body2"
                    className="text-[10px]"
                    color="text.secondary"
                  >
                    {product.description || '--'}
                  </Typography>
                </TableCell>
              )}
              {columnVisibility.unit && (
                <TableCell>
                  <Typography variant="body2" className="text-[12px]">
                    <Chip
                      color="primary"
                      className="h-4"
                      label={
                        <p className="text-[10px] w-[25px] text-center">
                          {product.unit}
                        </p>
                      }
                    />
                  </Typography>
                </TableCell>
              )}
              {columnVisibility.rating && (
                <TableCell>
                  <Rating
                    name="half-rating"
                    size="small"
                    value={product.productAvgRating}
                    precision={0.5}
                  />
                </TableCell>
              )}
              {columnVisibility.actions && (
                <TableCell className="flex">
                  <Tooltip title={`Edit ${product.name}`} placement="top">
                    <IconButton
                      color="secondary"
                      className="group rounded hover:bg-white hover:border-[1px] border-primary-main"
                      onClick={() => {
                        dispatch(setProductIdToEdit(product.id));
                        dispatch(openupdateProductDialog());
                      }}
                    >
                      <FiEdit3
                        fontSize={'small'}
                        className="group-hover:text-primary-main"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={`Add stock transaction for ${product.name}`}
                    placement="top"
                  >
                    <IconButton
                      color="secondary"
                      className="group rounded hover:bg-white hover:border-[1px] border-primary-main"
                      onClick={() => {
                        dispatch(setProductIdToEdit(product.id));
                        dispatch(addStockTransactionOpen());
                      }}
                    >
                      <HiOutlineInboxIn
                        fontSize={'small'}
                        className="group-hover:text-primary-main"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className={'flex '}>
        <Pagination
          className="p-4 ml-auto"
          count={productspageCount}
          color="primary"
          variant="outlined"
          page={filters.page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default ManageProductsTable;
