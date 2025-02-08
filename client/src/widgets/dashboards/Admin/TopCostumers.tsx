import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect } from 'react';
import { getTopCostumers } from '../../../features/StoreAnalytics/StoreAnalyticsThunk';
import TopCostumersBase from '../../../components/dashboards/AdminDashboard/topCostumersBase';

const TopCostumers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.StoreAnalytics.TopCostumers
  );
  useEffect(() => {
    dispatch(getTopCostumers());
  }, [dispatch]);
  return (
    <>
      <TopCostumersBase costumers={data} />
    </>
  );
};
export default TopCostumers;
