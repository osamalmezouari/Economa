import {
  Avatar,
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { CategoryType } from '../../../types/category';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../features/category/categoryThunk';
import { FiEdit3 } from 'react-icons/fi';
import {
  OpenUpdateCategoryDailog,
  setCategoryToEdit,
} from '../../../features/category/categorySlice';

const ManageCateogryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.category.Categories
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getCategoryList(currentPage));
  }, [currentPage, dispatch]);
  return (
    <>
      <Table className="mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow className="py-2">
            <TableCell className="py-2 h-6">id</TableCell>
            <TableCell className="py-2 h-6">category</TableCell>
            <TableCell className="py-2 h-6">description</TableCell>
            <TableCell className="py-2 h-6"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.categories.map((category: CategoryType, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {category.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={category.svgLink || ''}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {category.productsCount} products
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell className="w-1/3">
                <Typography variant="body2" className="text-[12px]">
                  {category.description}
                </Typography>
              </TableCell>

              <TableCell className="flex">
                <Tooltip title={`Edit ${category.name}`} placement="top">
                  <IconButton
                    color="secondary"
                    className="group rounded hover:bg-white hover:border-[1px] border-primary-main"
                    onClick={() => {
                      dispatch(setCategoryToEdit(category.id));
                      dispatch(OpenUpdateCategoryDailog());
                    }}
                  >
                    <FiEdit3
                      fontSize={'small'}
                      className="group-hover:text-primary-main"
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="flex">
        <Pagination
          className="p-4 ml-auto"
          count={data.pageCount} // Set the total number of pages
          color="primary"
          variant="outlined"
          page={currentPage} // Set the current page here
          onChange={handlePageChange}
          disabled={loading}
        />
      </Box>
    </>
  );
};
export default ManageCateogryTable;
