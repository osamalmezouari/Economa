<<<<<<< ours
import ProductCardGrid from "../components/extra/ProductCardGrid/productCardGrid"
import Home from "../layouts/Home"
import ProductsWithDiscount from "../layouts/ProductsWithDiscount"

const Landing = () => {
    return <>
        <Home />
        <ProductsWithDiscount />
        <ProductCardGrid />
=======
import ProductDialog from '../components/base/productDialog/ProductDialog';
import Home from '../layouts/Home';
import ProductsWithDiscount from '../layouts/ProductsWithDiscount';

const Landing = () => {
  return (
    <>
      <Home />
      <ProductsWithDiscount />
      <ProductDialog />
>>>>>>> theirs
    </>
}
export default Landing 
