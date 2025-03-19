import { useState } from 'react';
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
  AddCategory,
  getCategoryList,
} from '../../../features/category/categoryThunk';

import { MdOutlineCloudUpload } from 'react-icons/md';
import { CreateCategory } from '../../../types/category';
import { CloseCreateCategoryDailog } from '../../../features/category/categorySlice';

const AddCategoryDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: createLoading, error: createError } = useSelector(
    (state: RootState) => state.category.createCategory
  );
  const open = useSelector(
    (state: RootState) => state.category.isCreateCategoryOpen
  );

  const [category, setcategory] = useState<CreateCategory>({
    name: '',
    description: '',
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setcategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setcategory((prev: any) => ({ ...prev, file }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('file', category.file);
    await dispatch(AddCategory(formData));
    dispatch(CloseCreateCategoryDailog());
    await dispatch(getCategoryList(1));
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(CloseCreateCategoryDailog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="dense"
              value={category.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="dense"
              value={category.description}
              onChange={handleChange}
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          {/* File Upload Section */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              color="primary"
              className="w-max"
              startIcon={<MdOutlineCloudUpload />}
              sx={{ borderRadius: '5px' }}
            >
              upload Image
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {category.file && (
              <p className="mt-2 text-gray-500">{category?.file?.name}</p>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {createError && <Alert severity="error">{createError} </Alert>}
            {!createError ||
              (!createLoading && (
                <Alert severity="success">Product created successfully!</Alert>
              ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(CloseCreateCategoryDailog())}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="contained"
          disabled={createLoading}
        >
          {createLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            'Add Category'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
