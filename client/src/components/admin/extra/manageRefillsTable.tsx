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
import { useEffect, useState } from 'react';
import { getRefillList } from '../../../features/balance/balanceThunk';
import { Refills } from '../../../types/balance';
import DateCell from '../base/dateCell';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import {
  setImagePreview,
  setVisible,
} from '../../../features/common/commonSlice';

const ManageRefillsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.balance.refillsList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getRefillList(currentPage));
  }, [currentPage, dispatch]);
  return (
    <>
      <Table className="mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow className="py-2">
            <TableCell className="py-2 h-6">id</TableCell>
            <TableCell className="py-2 h-6">Costumer</TableCell>
            <TableCell className="py-2 h-6">Amount</TableCell>
            <TableCell className="py-2 h-6">Type</TableCell>
            <TableCell className="py-2 h-6">Status</TableCell>
            <TableCell className="py-2 h-6">Create At</TableCell>
            <TableCell className="py-2 h-6">Update At</TableCell>
            <TableCell className="py-2 h-6"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.refills.map((refill: Refills, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {refill.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={refill.avatar || ''}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {refill.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {refill.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell className="">
                <Typography variant="body2" className="text-[12px]">
                  ${refill.amount}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {refill.file === 'no file' ? 'Cash' : 'Bank Transfer'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {refill.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={refill.createdAt} />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={refill.updatedAt} />
                </Typography>
              </TableCell>

              <TableCell className="flex">
                <Tooltip title={`Preview File `} placement="top">
                  <IconButton
                    color="secondary"
                    className="group rounded hover:bg-white hover:border-[1px] border-primary-main"
                    onClick={() => {
                      {
                        refill.file !== 'no file' &&
                          dispatch(
                            setImagePreview(
                              `http://localhost:3000${refill.file}`
                            )
                          );
                      }
                      dispatch(setVisible(true));
                    }}
                  >
                    <HiOutlineViewfinderCircle
                      fontSize={''}
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
          count={data.pageCount}
          color="primary"
          variant="outlined"
          page={currentPage}
          onChange={handlePageChange}
          disabled={loading}
        />
      </Box>
    </>
  );
};
export default ManageRefillsTable;
