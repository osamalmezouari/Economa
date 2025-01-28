import { HttpException, HttpStatus } from '@nestjs/common';

export class COUPON_USAGE_LIMIT_EXCEEDED_Exception extends HttpException {
  constructor(couponCode: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: `The coupon with code "${couponCode}" has exceeded its usage limit.`,
        errorCode: 'COUPON_USAGE_LIMIT_EXCEEDED',
        data: { couponCode },
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
