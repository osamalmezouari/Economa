export interface PaymentTransactionType {
  id: string;
  orderId: string;
  amount: number;
  paymentDate: string;
  paymentStatus: string;
  order: {
    id: string;
    user: {
      name: string;
      email: string;
      avatar: string;
    };
  };
}

export interface Transactions {
  payments: PaymentTransactionType[];
  pageCount: number;
}

export interface TransactionsState {
  data: Transactions;
  loading: boolean;
  error: string;
}

export interface PaymentStoreType {
  Transactions: TransactionsState;
}
