import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { closeAddProductDialog } from '../../../features/products/productSlice';
import { UploadFile } from '@mui/icons-material';
import { getCategoriesNamesandIds } from '../../../features/category/categoryThunk';
import { CreateProduct } from '../../../features/products/productThunk';
import { createProduct } from '../../../types/product';

const AddProductDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.products.isAddProductOpen
  );
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.category.CategoriesnamesandIds);
  const {
    loading: createLoading,
    error: createError,
  } = useSelector((state: RootState) => state.category.CategoriesnamesandIds);

  const [product, setProduct] = useState<createProduct>({
    name: '',
    description: '',
    price: 0,
    cost_price: 0,
    discount: 0,
    categoryId: '',
    unitname: '',
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProduct((prev: any) => ({ ...prev, file }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();

    // Append product fields to FormData
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('cost_price', product.cost_price.toString());
    formData.append('discount', product.discount.toString());
    formData.append('categoryId', product.categoryId);
    formData.append('unitname', product.unitname.toString());
    formData.append('file', product.file);
    await dispatch(CreateProduct(formData));
    dispatch(closeAddProductDialog());
  };
  useEffect(() => {
    dispatch(getCategoriesNamesandIds());
  }, [dispatch]);
  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeAddProductDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="dense"
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
              >
                {loading
                  ? ''
                  : categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="dense"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={4}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              margin="dense"
              value={product.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Cost Price"
              name="cost_price"
              type="number"
              fullWidth
              margin="dense"
              value={product.cost_price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Discount (%)"
              name="discount"
              type="number"
              fullWidth
              margin="dense"
              value={product.discount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Unit name"
              name="unitname"
              fullWidth
              margin="dense"
              value={product.unitname}
              onChange={handleChange}
            />
          </Grid>

          {/* File Upload Section */}
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
              />
            </Button>
            {product.file && (
              <p className="mt-2 text-gray-500">{product?.file?.name}</p>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {createError && <Alert severity="error">{error} </Alert>}
            {!createError || !createLoading && (
              <Alert severity="success">Product created successfully!</Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(closeAddProductDialog())}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {createLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            'Add Product'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
