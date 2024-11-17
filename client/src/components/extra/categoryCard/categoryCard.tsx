import { Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // For Material UI Grid2
import CategoryCardSingle from "../../base/category-card/categoryCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store"; // Update this path based on your store location
import { getCategories } from "../../../features/category/categoryThunk";

const CategoryCard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <Container style={{ maxWidth: "1460px", marginTop: "40px" }}>
            {loading ? (
                <p>Loading categories...</p> // Display a loading message while categories are being fetched
            ) : (
                <Grid2 container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    {categories.map((category) => (
                        <CategoryCardSingle
                            key={category.id}
                            linkTo={`/category/${category.id}`}
                            svgLink={category.svgLink || ''} // Use the category icon (optional)
                            name={category.name}
                            description={category.description}
                            productsCount={category.productsCount || 0} // Include the products count
                        />
                    ))}
                </Grid2>
            )}
        </Container>
    );
};

export default CategoryCard;
