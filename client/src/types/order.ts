import { ApiError } from './apierror';

export interface place_and_pay_order {
  couponCode: string;
}

export interface OrderStateType {
  placeandpay: {
    data: {
      orderId: string;
    };
    loading: boolean;
    error: string;
  };
}
