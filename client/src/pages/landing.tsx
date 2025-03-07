
import Home from '../components/extra/Home';
import NewArrivalsSection from '../components/extra/newArrivalsSection';
import OfferBanner from '../components/extra/offerBanner';
import ProductsWithDiscount from '../components/extra/ProductsWithDiscount';
import PromoCardWraper from '../components/extra/PromoCard';
import ServicesContainer from '../components/extra/ServicesContainer';

const Landing = () => {
  return (
    <>
      <Home />
      <ProductsWithDiscount />
      <PromoCardWraper />
      <NewArrivalsSection />
      <OfferBanner />
      <ServicesContainer />
    </>
  );
};
export default Landing;
