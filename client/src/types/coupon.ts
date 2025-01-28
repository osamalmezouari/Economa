import { ApiError } from './apierror';

export interface verfy_coupon_type {
  code: string;
}

export interface couponStoreType {
  verifyCoupon: {
    data: {
      code: string;
      verfied? : boolean
    };
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
}
