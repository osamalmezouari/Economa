import { Container,  Grid2 } from "@mui/material"
import CategoryCardSingle from "../../base/category-card/categoryCard"




const CategoryCard = () => {
    return <Container style={{maxWidth :"1460px" , marginTop :"40px"}} >
    <Grid2 container spacing={4} sx={{alignItems : 'center' , justifyContent :'space-between'}} >
         <CategoryCardSingle />
        <CategoryCardSingle />
        <CategoryCardSingle />
        <CategoryCardSingle />
        <CategoryCardSingle />
        <CategoryCardSingle />
    </Grid2>
    </Container>
}

export default CategoryCard