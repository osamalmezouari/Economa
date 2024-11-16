import { Container, Grid2 } from "@mui/material"
import CategoryCardSingle from "../../base/category-card/categoryCard"




const CategoryCard = () => {
    return <Container style={{ maxWidth: "1460px", marginTop: "40px" }} >
        {/*map items here*/}
        <Grid2 container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }} >
            <CategoryCardSingle linkTo="" IconImage='' name={""} description={""} productsCount={0} />
        </Grid2>
    </Container>
}

export default CategoryCard