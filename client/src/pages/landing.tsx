import HealthSafetyBanner from '../components/base/promotional banners/healthSafety';
import Home from '../components/extra/Home';
import NewArrivalsSection from '../components/extra/newArrivalsSection';
import OfferBanner from '../components/extra/offerBanner';
import OfferBanner2 from '../components/extra/offerBanner-2';
import ProductsWithDiscount from '../components/extra/ProductsWithDiscount';
import ServicesContainer from '../components/extra/ServicesContainer';
import TestimonialsContainer from '../components/extra/TestimonialsContainer';

const Landing = () => {
  return (
    <>
      <Home />
      <HealthSafetyBanner />
      <ProductsWithDiscount />
      <OfferBanner />
      <NewArrivalsSection />
      <OfferBanner2 />
      <TestimonialsContainer />
      <ServicesContainer />
    </>
  );
};
export default Landing;
