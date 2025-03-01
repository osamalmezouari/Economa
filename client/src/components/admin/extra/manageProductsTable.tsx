import {
  Avatar,
  Box,
  Pagination,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect } from 'react';
import { getManageProductsTable } from '../../../features/products/productThunk';
import { ManageProduct } from '../../../types/product';
import { setManageFilter } from '../../../features/products/productSlice';
import { filter } from 'lodash';

const ManageProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.products.productsManage
  );
  const { products, productspageCount } = data;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setManageFilter({ key: 'page' as keyof ManageProduct, value }));
  };

  const filters = useSelector(
    (state: RootState) => state.products.manageProductsFilters.filters
  );
  useEffect(() => {
    dispatch(getManageProductsTable({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <Table className="border-[1px] mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discounted</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: ManageProduct) => (
            <TableRow key={product.id} className="hover:bg-gray-50">
              {/* ID */}
              <TableCell sx={{ width: '50px' }}>
                #{product.id.substring(0, 6)}...
              </TableCell>

              {/* Product */}
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

              {/* Cost Price */}
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  ${product.costprice.toFixed(2)}
                </Typography>
              </TableCell>

              {/* Price */}
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  ${product.price.toFixed(2)}
                </Typography>
              </TableCell>

              {/* Discounted Price */}
              <TableCell>
                <Typography
                  variant="body2"
                  className="text-center"
                  fontWeight={500}
                >
                  ${product.priceWithDiscount.toFixed(2)}
                </Typography>
              </TableCell>

              {/* Stock */}
              <TableCell>
                <Typography variant="body2">{product.stock}</Typography>
              </TableCell>

              {/* Description */}
              <TableCell>
                <Typography
                  variant="body2"
                  className="text-[10px]"
                  color="text.secondary"
                >
                  {product.description || '--'}
                </Typography>
              </TableCell>

              {/* Unit */}
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {product.unit}
                </Typography>
              </TableCell>

              {/* Rating */}
              <TableCell>
                <Rating
                  name="half-rating"
                  size="small"
                  value={product.productAvgRating}
                  precision={0.5}
                />
              </TableCell>
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
