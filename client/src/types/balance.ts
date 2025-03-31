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

export interface Refills {
  id: string;
  amount: number;
  file: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  avatar: string;
}

export interface updateRefillStatus {
  data: {
    requestId: string;
    userId: string;
  };
  loading: boolean;
  error: string;
}
export interface balanceStateType {
  refillBalanceRequest: {
    loading: boolean;
    error: string;
    data: RefillBalanceRequest;
  };
  balanceCard: {
    loading: boolean;
    error: string;
    data: BalanceCard;
  };
  refillsList: {
    loading: boolean;
    error: string;
    data: {
      refills: Refills[];
      pageCount: number;
    };
  };
  updateRefillStatus: updateRefillStatus;
}
