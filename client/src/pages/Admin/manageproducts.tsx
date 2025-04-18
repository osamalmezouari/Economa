import { Box, Button } from '@mui/material';
import PageHeader from '../../components/admin/base/pageheader/PageHeader';
import { BiPlus } from 'react-icons/bi';
import { Download } from '@mui/icons-material';
import ManageProductsTable from '../../components/admin/extra/products/manageProducts/manageProductsTable';
import ManageproductFilterBar from '../../components/admin/extra/products/manageProducts/productSideBarFilter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import exportToCSV from '../../utils/exportcsv';
import { openAddProductDialog } from '../../features/products/productSlice';
import EditProductDialog from '../../components/admin/extra/products/manageProducts/updateproduct';
import AddStockTransaction from '../../components/admin/extra/products/manageProducts/addStockTransaction';
const ManageProducts = () => {
  const { data } = useSelector(
    (state: RootState) => state.products.productsManage
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box className={'p-4 mt-16'}>
      <PageHeader
        title="Manage Products"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'products' },
          {
            name: 'Manage Products',
          },
        ]}
        className="custom-class"
      >
        <Button
          variant="outlined"
          className="px-4 py-2 mr-2"
          startIcon={<Download />}
          onClick={() => exportToCSV(data.products, 'productsCSV')}
        >
          Export
        </Button>
        <Button
          variant="contained"
          className="px-4 py-2"
          startIcon={<BiPlus />}
          onClick={() => {
            dispatch(openAddProductDialog());
          }}
        >
          add product
        </Button>
      </PageHeader>
      <ManageProductsTable />
      <ManageproductFilterBar />
      <EditProductDialog />
      <AddStockTransaction />
    </Box>
  );
};
export default ManageProducts;
