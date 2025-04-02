import { createSlice } from '@reduxjs/toolkit';
import {
  getbalanceCardInfo,
  getRefillList,
  getRequestStatus,
  refillBalanceRequest,
  UpdateRefillStatus,
} from './balanceThunk';
import { balanceStateType } from '../../types/balance';

const initialState: balanceStateType = {
  refillBalanceRequest: {
    loading: false,
    error: '',
    data: {
      paymentType: 'cash',
      file: null,
      amount: 0,
      reqStatus: { statusCode: null, message: null },
    },
  },
  balanceCard: {
    loading: false,
    error: '',
    data: {
      balance: 0,
      name: '',
    },
  },
  refillsList: {
    loading: false,
    error: '',
    data: {
      refills: [],
      pageCount: 0,
    },
  },

  updateRefillStatus: {
    loading: false,
    error: '',
    data: {
      requestId: 'string',
      userId: 'string',
    },
  },
  requestStatus: {
    loading: false,
    error: '',
    data: [],
  },
  requestIdtoViewStatus: '',
  openRefillStatusModal: false,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    /*     setRefillBalanceRequest: (state, action) => {
      state.refillBalanceRequest.data = action.payload;
    }, */
    openRefillStatusModal: (state) => {
      state.openRefillStatusModal = true;
    },
    closeRefillStatusModal: (state) => {
      state.openRefillStatusModal = false;
    },
    setRequestIdToViewStatus: (state, action) => {
      state.requestIdtoViewStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refillBalanceRequest.pending, (state) => {
        state.refillBalanceRequest.loading = true;
        state.refillBalanceRequest.error = '';
      })
      .addCase(refillBalanceRequest.fulfilled, (state, action) => {
        state.refillBalanceRequest.loading = false;
        state.refillBalanceRequest.error = '';
        state.refillBalanceRequest.data = action.payload;
      })
      .addCase(refillBalanceRequest.rejected, (state, action) => {
        state.refillBalanceRequest.loading = false;
        state.refillBalanceRequest.error = action.payload as string;
      })
      .addCase(getbalanceCardInfo.pending, (state) => {
        state.balanceCard.loading = true;
        state.balanceCard.error = '';
      })
      .addCase(getbalanceCardInfo.fulfilled, (state, action) => {
        state.balanceCard.loading = false;
        state.balanceCard.error = '';
        state.balanceCard.data = action.payload;
      })
      .addCase(getbalanceCardInfo.rejected, (state, action) => {
        state.balanceCard.loading = false;
        state.balanceCard.error = action.payload as string;
      })

      .addCase(getRefillList.pending, (state) => {
        state.refillsList.loading = true;
        state.refillsList.error = '';
      })

      .addCase(getRefillList.fulfilled, (state, action) => {
        state.refillsList.loading = false;
        state.refillsList.error = '';
        state.refillsList.data = action.payload;
      })

      .addCase(getRefillList.rejected, (state, action) => {
        state.refillsList.loading = false;
        state.refillsList.error = action.payload as string;
      })

      .addCase(UpdateRefillStatus.pending, (state) => {
        state.updateRefillStatus.loading = true;
        state.updateRefillStatus.error = '';
      })

      .addCase(UpdateRefillStatus.fulfilled, (state, action) => {
        state.updateRefillStatus.loading = false;
        state.updateRefillStatus.error = '';
        state.updateRefillStatus.data = action.payload;
      })

      .addCase(UpdateRefillStatus.rejected, (state, action) => {
        state.updateRefillStatus.loading = false;
        state.updateRefillStatus.error = action.payload as string;
      })

      .addCase(getRequestStatus.fulfilled, (state, action) => {
        state.requestStatus.loading = false;
        state.requestStatus.error = '';
        state.requestStatus.data = action.payload;
      })
      .addCase(getRequestStatus.rejected, (state, action) => {
        state.requestStatus.loading = false;
        state.requestStatus.error = action.payload as string;
      })
      .addCase(getRequestStatus.pending, (state) => {
        state.requestStatus.loading = true;
        state.requestStatus.error = '';
      });
  },
});

export default balanceSlice.reducer;
export const balanceReducer = balanceSlice.reducer;
export const {
  openRefillStatusModal,
  closeRefillStatusModal,
  setRequestIdToViewStatus,
} = balanceSlice.actions;
