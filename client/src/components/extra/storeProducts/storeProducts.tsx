import { Box, CircularProgress, Grid, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getProductsStore } from '../features/products/productThunk';
import { useEffect, useState } from 'react';
import ProductCard from '../components/base/ProductCard/ProductCard';

const StoreProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.products.productsStore);
    const { products, productPageCount } = useSelector((state: RootState) => state.products.productsStore.data);
    const [page, setPage] = useState(1);


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    useEffect(() => {
        dispatch(getProductsStore(page));
    }, [dispatch, page]);

    return (
        <Grid container spacing={2} sx={{ marginTop: '0px' }}>
            {loading && !products.length ? (
                <Box className={'w-full flex justify-center items-center py-8'}>
                    <CircularProgress className='' />
                </Box>
            ) : (
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                        <ProductCard
                            id={product.id}
                            discount={product.discount}
                            name={product.name}
                            categoryName={product.categoryName}
                            description={product.description}
                            productAvgRaiting={product.productAvgRaiting}
                            price={product.price}
                            priceWithDiscount={product.priceWithDiscount}
                            unit={product.unit}
                            imageLink={product.imageLink}
                        />
                    </Grid>
                ))
            )}
            <Pagination count={productPageCount} page={page} onChange={handlePageChange} variant="outlined" color='primary' className='my-4 ml-auto' />
        </Grid>
    );
};

export default StoreProducts;
