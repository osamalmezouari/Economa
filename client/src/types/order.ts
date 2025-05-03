export interface place_and_pay_order {
  couponCode: string;
}
export interface Order {
  id: string;
  userId: string;
  couponId: string | null;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  orderItems: {
    quantity: number;
    product: {
      name: string;
      gallery: {
        imageUrl: string;
      }[];
      Units: {
        name: string;
      };
    };
  }[];
  user: {
    name: string;
    avatar: string;
    email: string;
  };
}

export interface OrderStateType {
  placeandpay: {
    data: {
      orderId: string;
    };
    loading: boolean;
    error: string;
  };
  OrdersHistory: {
    data: {
      orders: Order[];
      pageCount: number;
    };
    loading: boolean;
    error: string;
  };

  OrderById: {
    data: Order;
    loading: boolean;
    error: string;
  };

  UserOrders: {
    data: {
      orders: Order[];
      pageCount: number;
    };
    loading: boolean;
    error: string;
  };
}
