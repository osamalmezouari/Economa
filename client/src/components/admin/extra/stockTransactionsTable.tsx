import {
  Avatar,
  Box,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect, useState } from 'react';

import { StockTransactionType } from '../../../types/product';
import { StockTransaction } from '../../../features/products/productThunk';
import DateCell from '../base/dateCell';

const StockTransactionsTable = () => {
  enum TransactionType {
    purchase = 'purchase',
    sale = 'sale',
    return = 'return',
    adjustment = 'adjustment',
  }
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.products.stockTransactions
  );

  const { stockTransactions, pageCount } = data;
  const [currentPage, setCurrentPage] = useState(1); // Added state for the current page

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    await dispatch(StockTransaction(value));
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.purchase:
        return 'info'; // Blue for purchase
      case TransactionType.sale:
        return 'success'; // Green for sale
      case TransactionType.return:
        return 'warning'; // Yellow for return
      case TransactionType.adjustment:
        return 'default'; // Grey for adjustment
      default:
        return 'default'; // Default color if type is unknown
    }
  };
  useEffect(() => {
    dispatch(StockTransaction(1));
  }, [dispatch]);

  return (
    <>
      <Table className="mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow className="py-2">
            <TableCell className="py-2 h-6">Product</TableCell>
            <TableCell className="py-2 h-6">Unit</TableCell>
            <TableCell className="py-2 h-6">Quantity</TableCell>
            <TableCell className="py-2 h-6">Type</TableCell>
            <TableCell className="py-2 h-6">Date</TableCell>
            <TableCell className="py-2 h-6">Unit Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockTransactions.map((transaction: StockTransactionType, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={transaction.imageUrl || ''}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {transaction.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {transaction.categoryName}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  <Chip
                    color="primary"
                    className="h-4"
                    label={
                      <p className="text-[10px] w-[25px] text-center">
                        {transaction.unitName}
                      </p>
                    }
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  color={transaction.quantity > 0 ? 'primary' : 'secondary'}
                  className="h-4"
                  label={
                    <p className="text-[10px]">
                      {transaction.quantity > 0
                        ? `+${transaction.quantity}`
                        : transaction.quantity}
                    </p>
                  }
                />
              </TableCell>

              <TableCell>
                <Chip
                  color={getTransactionColor(transaction.Type)}
                  className="h-4 min-w-[80px] rounded-[4px]"
                  label={
                    <p className="text-[12px] font-Inria">{transaction.Type}</p>
                  }
                />
              </TableCell>
              <TableCell>
                <DateCell date={transaction.date} />
              </TableCell>
              <TableCell>
                ${transaction.unitCost ? transaction.unitCost : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="flex">
        <Pagination
          className="p-4 ml-auto"
          count={pageCount}
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

export default StockTransactionsTable;
