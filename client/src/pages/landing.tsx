import ProductCardGrid from "../components/extra/ProductCardGrid/productCardGrid"
import Home from "../layouts/Home"
import ProductsWithDiscount from "../layouts/ProductsWithDiscount"

const Landing = () => {
    return <>
        <Home />
        <ProductsWithDiscount />
        <ProductCardGrid />
    </>
}
export default Landing 
