import { HttpException, HttpStatus } from '@nestjs/common';

export class Coupon_NOT_FOUND_Exception extends HttpException {
  constructor(couponId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The coupon with ID ${couponId} does not exist.`,
        errorCode: 'COUPON_NOT_FOUND',
        data: { couponId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
