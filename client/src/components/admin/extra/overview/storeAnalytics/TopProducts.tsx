import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { useEffect } from 'react';
import { getTopSellingProducts } from '../../../../../features/StoreAnalytics/StoreAnalyticsThunk';
import TopProductsBase from '../../../base/topProductsBase';

const TopProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.StoreAnalytics.TopSellingProducts
  );
  useEffect(() => {
    dispatch(getTopSellingProducts());
  }, [dispatch]);
  return (
    <>
      <TopProductsBase products={data} />
    </>
  );
};
export default TopProducts;
