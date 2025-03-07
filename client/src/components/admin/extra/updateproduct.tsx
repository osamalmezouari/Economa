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
import { getCategoriesNamesandIds } from '../../../features/category/categoryThunk';
import {
  getProductById,
  UpdateProduct,
} from '../../../features/products/productThunk';
import { updateProduct } from '../../../types/product';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { closeupdateProductDialog } from '../../../features/products/productSlice';

const EditProductDialog: React.FC = () => {
  const productId = useSelector(
    (state: RootState) => state.products.productToEditId
  );
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.products.isEditProductOpen
  );
  const { data: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.category.CategoriesnamesandIds
  );
  const {
    loading: updateLoading,
    error: updateError,
    data: updateData,
  } = useSelector((state: RootState) => state.products.updateProduct);
  const targetproductdata = useSelector(
    (state: RootState) => state.products.productById.data
  );
  const [product, setProduct] = useState<updateProduct>({
    name: targetproductdata?.name,
    description: targetproductdata?.description,
    price: targetproductdata?.price,
    cost_price: targetproductdata?.cost_price,
    discount: targetproductdata?.discount,
    categoryId: targetproductdata?.categoryId,
    unitname: targetproductdata?.unitname,
    file: null,
  });

  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getCategoriesNamesandIds());
  }, [dispatch, productId]);

  useEffect(() => {
    if (targetproductdata) {
      setProduct({
        name: targetproductdata.name || '',
        description: targetproductdata.description || '',
        price: targetproductdata.price || 0,
        cost_price: targetproductdata.cost_price || 0,
        discount: targetproductdata.discount || 0,
        categoryId: targetproductdata.categoryId || '',
        unitname: targetproductdata.unitname || '',
        file: null, // Keep file as null since it's not stored in Redux
      });
    }
  }, [targetproductdata]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    if (product.name) {
      formData.append('name', product.name);
    }
    if (product.description) {
      formData.append('description', product.description);
    }
    if (product.price !== undefined) {
      formData.append('price', product.price.toString());
    }
    if (product.cost_price !== undefined) {
      formData.append('cost_price', product.cost_price.toString());
    }
    if (product.discount !== undefined) {
      formData.append('discount', product.discount.toString());
    }
    if (product.categoryId) {
      formData.append('categoryId', product.categoryId);
    }
    if (product.unitname) {
      formData.append('unitname', product.unitname);
    }
    if (product.file) {
      formData.append('file', product.file);
    }

    await dispatch(UpdateProduct({ productId, formData }));
    dispatch(closeupdateProductDialog());
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeupdateProductDialog())}
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
            {updateData?.name && (
              <Alert severity="success">Product updated successfully!</Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(closeupdateProductDialog())}
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
