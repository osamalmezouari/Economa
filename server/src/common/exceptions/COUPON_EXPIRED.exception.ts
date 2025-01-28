import { HttpException, HttpStatus } from '@nestjs/common';

export class COUPON_EXPIRED_Exception extends HttpException {
  constructor(couponCode: string) {
    super(
      {
        statusCode: HttpStatus.GONE,
        message: `The coupon with code "${couponCode}" has expired.`,
        errorCode: 'COUPON_EXPIRED',
        data: { couponCode },
      },
      HttpStatus.GONE,
    );
  }
}
