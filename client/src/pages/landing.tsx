import ProductCard from "../components/base/ProductCard/ProductCard"
import Home from "../layouts/Home"
import ProductsWithDiscount from "../layouts/ProductsWithDiscount"

const Landing = () => {
    return <>
        <Home />
        <ProductsWithDiscount />
        <ProductCard />
    </>
}
export default Landing 
