import { HttpException, HttpStatus } from '@nestjs/common';

export class COUPON_NOT_ASSIGNED_Exception extends HttpException {
  constructor(couponCode: string, userId: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: `The coupon with code "${couponCode}" is not assigned to the user with ID "${userId}".`,
        errorCode: 'COUPON_NOT_ASSIGNED',
        data: { couponCode, userId },
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
