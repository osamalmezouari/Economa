import { ApiError } from './apierror';

export interface RefillBalanceRequest {
  paymentType: 'cash' | 'bank-transfer';
  file: File | null;
  amount: number;
  reqStatus: { statusCode: number | null; message: string | null };
}


export interface BalanceCard {
  balance: number;
  name: string;
}

export interface balanceStateType {
  refillBalanceRequest: {
    loading: boolean;
    error: ApiError | null | undefined | unknown;
    data: RefillBalanceRequest;
  };
  balanceCard: {
    loading: boolean;
    error: ApiError | null | undefined | unknown;
    data: BalanceCard;
  }
}
