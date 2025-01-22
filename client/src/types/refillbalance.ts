import { ApiError } from "./apierror";

export interface RefillBalanceRequest {
  paymentType: 'cash' | 'bank-transfer';
  file: File | null;
  amount: number;
}

export interface BalanceType {
  Balance: number;
  name: string;
}

export interface balanceStateType {
  refillBalanceRequest: {
    loading: boolean;
    error: ApiError | null | undefined | unknown;
    data: RefillBalanceRequest;
  };
}
