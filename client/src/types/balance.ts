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

export interface RequestStatus {
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
[];
export interface TransferRequest {
  receiverEmail: string;
  amount: number;
  description: string;
  reqStatus: { statusCode: number | null; message: string | null };
}

export interface Transfer {
  id: string;
  amount: number;
  description: string;
  createdAt: string;
  sender: {
    email: string;
    name: string;
    avatar: string | null;
  };
  receiver: {
    email: string;
    name: string;
    avatar: string | null;
  };
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
  userRefillsList: {
    loading: boolean;
    error: string;
    data: {
      refills: Refills[];
      pageCount: number;
    };
  };
  requestStatus: {
    loading: boolean;
    error: string;
    data: RequestStatus[];
  };
  requestIdtoViewStatus: string;
  updateRefillStatus: updateRefillStatus;
  openRefillStatusModal: boolean;
  transferRequest: {
    loading: boolean;
    error: string;
    data: TransferRequest;
  };
  userTransfers: {
    loading: boolean;
    error: string;
    data:{
      transfers : Transfer[] ,
      pageCount : number
    } ;
  };
}
