import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/extra/pageheader/PageHeader';
import { Download } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import ManageCateogryTable from '../../components/admin/extra/categorymanageTable';
import { BiPlus } from 'react-icons/bi';
import { openAddProductDialog } from '../../features/products/productSlice';
import { OpenCreateCategoryDailog } from '../../features/category/categorySlice';

const ManageCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, pageCount } = useSelector(
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
            exportToCSV(categories, `TransactionsCSV-${pageCount}`)
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
    </Box>
  );
};
export default ManageCategories;
