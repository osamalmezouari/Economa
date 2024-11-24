import OfferBanner from '../components/extra/offerBanner/offerBanner';
import PromoCardWraper from '../components/extra/PromoCard/PromoCard';
import Home from '../layouts/Home';
import NewArrivalsSection from '../layouts/newArrivalsSection';
import ProductsWithDiscount from '../layouts/ProductsWithDiscount';

const Landing = () => {
  return (
    <>
      <Home />
      <ProductsWithDiscount />
      <PromoCardWraper />
      <NewArrivalsSection />
      <OfferBanner />
    </>
  );
};
export default Landing;
