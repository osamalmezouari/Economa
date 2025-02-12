
export interface verfy_coupon_type {
  code: string;
  orderAmountValue: number;
}

export interface couponStoreType {
  verifyCoupon: {
    data: {
      code: string;
      verified: boolean;
      discount_type: string;
      discount_value: number;
    };
    loading: boolean;
    error: string;
  };
}
