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
import { closeEditProductDialog } from '../../../features/products/productSlice';
import { getCategoriesNamesandIds } from '../../../features/category/categoryThunk';
import {
  updateProduct,
  getProductById,
} from '../../../features/products/productThunk';
import { createProduct } from '../../../types/product';
import { MdOutlineCloudUpload } from 'react-icons/md';

interface EditProductDialogProps {
  productId: string;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.products.isEditProductOpen
  );
  const { data: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.category.CategoriesnamesandIds
  );

  const { loading: updateLoading, error: updateError } = useSelector(
    (state: RootState) => state.products.updateProductStatus
  );

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

  useEffect(() => {
    dispatch(getCategoriesNamesandIds());
    dispatch(getProductById(productId)).then((res) => {
      if (res.payload) {
        setProduct(res.payload);
      }
    });
  }, [dispatch, productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProduct((prev) => ({ ...prev, file }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('cost_price', product.cost_price.toString());
    formData.append('discount', product.discount.toString());
    formData.append('categoryId', product.categoryId);
    formData.append('unitname', product.unitname);
    if (product.file) {
      formData.append('file', product.file);
    }

    await dispatch(updateProduct({ productId, formData }));
    dispatch(closeEditProductDialog());
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeEditProductDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Product</DialogTitle>
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
                {categoriesLoading
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
              inputProps={{ maxLength: 100 }}
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
              variant="contained"
              component="label"
              color="primary"
              startIcon={<MdOutlineCloudUpload />}
              sx={{ borderRadius: '5px' }}
            >
              Upload Image
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {product.file && (
              <p className="mt-2 text-gray-500">{product.file.name}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            {updateError && <Alert severity="error">{updateError}</Alert>}
            {!updateError && !updateLoading && (
              <Alert severity="success">Product updated successfully!</Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(closeEditProductDialog())}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="contained"
          disabled={updateLoading}
        >
          {updateLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
