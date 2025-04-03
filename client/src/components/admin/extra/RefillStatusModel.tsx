import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { closeRefillStatusModal } from '../../../features/balance/balanceSilce';
import { AppDispatch, RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRequestStatus } from '../../../features/balance/balanceThunk';

const RefillstatusModel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.balance.openRefillStatusModal
  );
  const data = useSelector(
    (state: RootState) => state.balance.requestStatus.data
  );

  const requestId = useSelector(
    (state: RootState) => state.balance.requestIdtoViewStatus
  );

  useEffect(() => {
    dispatch(getRequestStatus(requestId));
  }, [requestId, dispatch]);

  return (
    <Dialog open={open} onClose={() => dispatch(closeRefillStatusModal())}>
      <DialogTitle>{<p>Refill Request Status History</p>}</DialogTitle>
      <DialogContent>
        <div className="">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="font-bold capitalize">{item.status}</p>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(closeRefillStatusModal())}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefillstatusModel;
