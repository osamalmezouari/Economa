import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import ManageCateogryTable from '../../components/admin/extra/products/manageCategory/categorymanageTable';
import { BiPlus } from 'react-icons/bi';
import { OpenCreateCategoryDailog } from '../../features/category/categorySlice';
import UpdateCategoryDialog from '../../components/admin/extra/products/manageCategory/updateCategory';

const ManageCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector(
    (state: RootState) => state.category.Categories.data
  );
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Manage Categories"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'products' },
          {
            name: 'Manage Categories',
          },
        ]}
        className="custom-class"
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() =>
            exportToCSV(categories, `TransactionsCSV`)
          }
        >
          Export
        </Button>
        <Button
          variant="contained"
          className="px-4 py-2"
          startIcon={<BiPlus />}
          onClick={() => {
            dispatch(OpenCreateCategoryDailog());
          }}
        >
          add Category
        </Button>
      </PageHeader>
      <ManageCateogryTable />
      <UpdateCategoryDialog />
    </Box>
  );
};
export default ManageCategories;
