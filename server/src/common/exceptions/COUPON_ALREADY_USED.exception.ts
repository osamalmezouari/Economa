import { HttpException, HttpStatus } from '@nestjs/common';

export class COUPON_ALREADY_USED_Exception extends HttpException {
  constructor(couponCode: string, userId: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `The user with ID "${userId}" has already used the coupon "${couponCode}".`,
        errorCode: 'COUPON_ALREADY_USED',
        data: { couponCode, userId },
      },
      HttpStatus.CONFLICT,
    );
  }
}
