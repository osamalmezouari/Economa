import { Box } from '@mui/material';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getbalanceCardInfo } from '../../features/balance/balanceThunk';

const BalanceCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { balance, name } = useSelector(
    (state: RootState) => state.balance.balanceCard.data
  );
  useEffect(() => {
    dispatch(getbalanceCardInfo());
  }, [dispatch]);

  return (
    <Box className={'relative my-4'}>
      <img
        src="/assets/images/balanceCard.svg"
        className="rounded  drop-shadow-lg"
        alt="Balance Card"
      ></img>
      <Box
        className={
          'absolute top-[42%] left-[5%] text-white text-2xl uppercase font-Inria'
        }
      >
        {name}
      </Box>
      <Box
        className={
          'absolute bottom-[12%] left-[10%] text-white capitalize font-Inria'
        }
      >
        <span className="text-[28px]">
          {balance?.toFixed(2).toString().split(',')[0]}
        </span>
        <span className="text-[12px]">
          {balance?.toFixed(2).toString().split(',')[1]}
        </span>
      </Box>
      <p
        className={
          'absolute bottom-[15%] right-[10%] text-white capitalize font-Inria'
        }
      >
        {new Date().getFullYear()}
      </p>
    </Box>
  );
};
export default BalanceCard;
