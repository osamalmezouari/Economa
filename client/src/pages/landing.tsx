import PromoCardWraper from '../components/extra/PromoCard/PromoCard';
import Home from '../layouts/Home';
import ProductsWithDiscount from '../layouts/ProductsWithDiscount';

const Landing = () => {
  return (
    <>
      <Home />
      <ProductsWithDiscount />
      <PromoCardWraper />
    </>
  );
};
export default Landing;
