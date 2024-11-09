import { HttpException, HttpStatus } from '@nestjs/common';

export class INVALID_COUPON_CODE_Exception extends HttpException {
  constructor(couponCode: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `The coupon code ${couponCode} is invalid or has expired.`,
        errorCode: 'INVALID_COUPON',
        data: { couponCode },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
