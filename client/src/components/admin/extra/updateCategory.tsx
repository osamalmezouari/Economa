import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import {
  getCategoryById,
  updateCategory,
} from '../../../features/category/categoryThunk';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { UpdateCategory } from '../../../types/category';
import { CloseUpdateCategoryDailog } from '../../../features/category/categorySlice';

const UpdateCategoryDialog: React.FC = () => {
  const CategoryId = useSelector(
    (state: RootState) => state.category.categorytoEdit
  );
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.category.isUpdateCategoryOpen
  );

  const {
    loading: updateLoading,
    error: updateError,
    data: updateData,
  } = useSelector((state: RootState) => state.category.updateCategory);
  const targetCategorydata = useSelector(
    (state: RootState) => state.category.CategoryById.data
  );
  const [Category, setCategory] = useState<UpdateCategory>({
    name: '',
    description: '',
    file: null,
  });

  useEffect(() => {
    dispatch(getCategoryById(CategoryId));
  }, [dispatch, CategoryId]);

  useEffect(() => {
    if (targetCategorydata) {
      setCategory({
        name: targetCategorydata.name || '',
        description: targetCategorydata.description || '',
        file: null,
      });
    }
  }, [targetCategorydata]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCategory((prev) => ({ ...prev, file }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (Category.file) {
      formData.append('file', Category.file);
    }
    formData.append('name', Category.name);
    formData.append('description', Category.description);

    await dispatch(updateCategory({ formData, CategoryId }));
    dispatch(CloseUpdateCategoryDailog());
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(CloseUpdateCategoryDailog())}
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
              value={Category.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="dense"
              value={Category.description}
              onChange={handleChange}
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
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
            {Category.file && (
              <p className="mt-2 text-gray-500">{Category.file.name}</p>
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
          onClick={() => dispatch(CloseUpdateCategoryDailog())}
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

export default UpdateCategoryDialog;
