import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { UploadFile, Wallet } from '@mui/icons-material';
import { RefillBalanceRequest } from '../types/balance';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  getbalanceCardInfo,
  refillBalanceRequest,
} from '../features/balance/balanceThunk';
import { ApiError } from '../types/apierror';
import BalanceCard from '../components/extra/balanceCard/balanceCard';

const RefillBalanceRequestPage = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.balance.refillBalanceRequest
  );
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<RefillBalanceRequest>({
    amount: 0,
    paymentType: 'cash',
    file: null,
    reqStatus: { statusCode: null, message: null },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, file: selectedFile }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: ChangeEvent<{ value: 'cash' | 'bank-transfer' }>
  ) => {
    setFormData((prev) => ({ ...prev, paymentType: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('amount', formData.amount.toString());
    formDataToSend.append('paymentType', formData.paymentType);

    if (formData.file && formData.paymentType === 'bank-transfer') {
      formDataToSend.append('file', formData.file);
    }
    await dispatch(refillBalanceRequest(formDataToSend));
    setFormData({
      amount: 0,
      paymentType: 'cash',
      file: null,
      reqStatus: { statusCode: null, message: null },
    });
  };

  useEffect(() => {
    dispatch(getbalanceCardInfo());
  }, [dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="relative flex max-w-[1000px] gap-4 h-full my-20 m-auto items-center justify-center"
    >
      <BalanceCard />

      <Grid container className="justify-center items-center p-4 gap-y-2">
        <Grid item xs={12} className="flex justify-between">
          <Typography variant="h5" className="text-primary-main">
            Refill Balance
          </Typography>
          <Chip label="2500 2000 3000 4000" color="primary" icon={<Wallet />} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Amount"
            placeholder="Enter amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            helperText={
              formData.amount > 50 ? '' : 'Amount should be greater than 50$'
            }
            inputProps={{ min: 50 }}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: (theme) => theme.palette.secondary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: (theme) => theme.palette.primary.main,
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              id="payment-type-label"
              sx={{
                '&.Mui-focused': {
                  color: 'black',
                },
              }}
            >
              Payment Type
            </InputLabel>
            <Select
              labelId="payment-type-label"
              value={formData.paymentType}
              onChange={handleSelectChange}
              label="Payment Type"
              sx={{
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => theme.palette.secondary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {formData.paymentType === 'bank-transfer' && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              color="secondary"
              className="w-full"
              startIcon={<UploadFile />}
              sx={{ borderRadius: '1px' }}
            >
              Bank Transfer File
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                hidden
                required={formData.paymentType === 'bank-transfer'}
              />
            </Button>
            {formData.file && (
              <p className="mt-2 text-gray-500">{formData.file.name}</p>
            )}
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {error instanceof ApiError && (
            <Alert severity="error">{error.message}</Alert>
          )}
          {data.reqStatus.statusCode === 201 ? (
            <Alert severity="success">{data.reqStatus.message}</Alert>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} sx={{ padding: 0 }}>
          <Button
            className="w-full"
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size="30px" color="inherit" />
            ) : (
              'Refill Balance'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RefillBalanceRequestPage;
