import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { AddStockTransaction } from '../../../features/products/productThunk';
import { addStockTransactionClose } from '../../../features/products/productSlice';
import { addStockTransaction } from '../../../types/product';

const transactionTypes = ['purchase', 'sale', 'return', 'adjustment'];

export default function AddStockTransactions() {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<addStockTransaction>({
    transactionType: 'purchase',
    quantity: 0,
    unitCost: 0,
    productId: '',
  });

  const { data, loading, error } = useSelector(
    (state: RootState) => state.products.createTransaction
  );

  const open = useSelector(
    (state: RootState) => state.products.isStockTransactionOpen
  );

  const tragetproduct = useSelector(
    (state: RootState) => state.products.productToEditId
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await dispatch(AddStockTransaction(formData));
  };

  useEffect(() => {
    setFormData({
      ...formData,
      productId: tragetproduct,
    });
  }, [tragetproduct]);
  return (
    <Dialog
      open={open}
      onClose={() => dispatch(addStockTransactionClose())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Stock Transaction</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Transaction Type</InputLabel>
          <Select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
        />

        {formData.transactionType === 'purchase' && (
          <TextField
            fullWidth
            margin="dense"
            label="Unit Cost"
            name="unitCost"
            type="number"
            value={formData.unitCost}
            onChange={handleChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => addStockTransactionClose()} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {data.productId ? (
            'Submit'
          ) : (
            <CircularProgress color="primary" size={20} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
