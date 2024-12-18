import OfferBanner from '../components/extra/offerBanner/offerBanner';
import PromoCardWraper from '../components/extra/PromoCard/PromoCard';
import ServicesContainer from '../components/extra/servicesContainer/ServicesContainer';
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
      <ServicesContainer />      
    </>
  );
};
export default Landing;
