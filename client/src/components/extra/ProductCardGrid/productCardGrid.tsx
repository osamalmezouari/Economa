import { Box, Container, Grid } from "@mui/material"; // Corrected Grid2 to Grid if needed for compatibility
import ProductCard from "../../base/ProductCard/ProductCard";

const ProductCardGrid = () => {
    return (
            <Grid container spacing={2} maxWidth={'1400px'} margin={'auto'}>
                {/* Grid items with ProductCard components */}
                <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    <ProductCard />
                </Grid>
            </Grid>
    );
};

export default ProductCardGrid;
