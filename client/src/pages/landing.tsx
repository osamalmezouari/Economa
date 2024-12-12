import Footer from '../components/extra/footer/footer';
import OfferBanner from '../components/extra/offerBanner/offerBanner';
import PromoCardWraper from '../components/extra/PromoCard/PromoCard';
import ServicesContainer from '../components/extra/servicesContainer/ServicesContainer';
import ShoppingCartPreview from '../components/extra/shoppingCart/shoopingCart';
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
      <Footer />
      
    </>
  );
};
export default Landing;
