import {
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
import { useEffect, useState } from 'react';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { AppDispatch, RootState } from '../../../../app/store';
import { getUserRefills } from '../../../../features/balance/balanceThunk';
import { Refills as RefillsType } from '../../../../types/balance';
import DateCell from '../../../admin/base/dateCell';
import {
  setImagePreview,
  setVisible,
} from '../../../../features/common/commonSlice';
import { CURRENCY_SYMBOL } from '../../../../utils/constants';

const Refills = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.balance.userRefillsList
  );
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getUserRefills(currentPage));
  }, [currentPage, dispatch]);

  return (
    <>
      <Table className="mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow className="py-2">
            <TableCell className="py-2 h-6">ID</TableCell>
            <TableCell className="py-2 h-6">Amount</TableCell>
            <TableCell className="py-2 h-6">Type</TableCell>
            <TableCell className="py-2 h-6">Status</TableCell>
            <TableCell className="py-2 h-6">Created At</TableCell>
            <TableCell className="py-2 h-6">Updated At</TableCell>
            <TableCell className="py-2 h-6"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.refills.map((refill: RefillsType, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {refill.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell className="">
                <Typography variant="body2" className="text-[12px]">
                {CURRENCY_SYMBOL}{refill.amount}
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
              <TableCell>
                {refill.file !== 'no file' && (
                  <Tooltip title={`Preview File`} placement="top">
                    <IconButton
                      color="secondary"
                      className="group rounded hover:bg-white hover:border-[1px] border-primary-main"
                      onClick={() => {
                        dispatch(
                          setImagePreview(`http://localhost:3000${refill.file}`)
                        );
                        dispatch(setVisible(true));
                      }}
                    >
                      <HiOutlineViewfinderCircle
                        fontSize={''}
                        className="group-hover:text-primary-main"
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={data.pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default Refills;
