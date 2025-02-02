import { HttpException, HttpStatus } from '@nestjs/common';

export class COUPON_ORDER_AMOUNT_IS_LESS_EXCEPTION extends HttpException {
  constructor(amount: number) {
    super(
      {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        message: `THE ORDER WITH THE AMOUNT ${amount}$ IS LESS TAHN THE MINUIM ORDER AMOUNT`,
        errorCode: 'LESS_ORDER_AMOUNT',
        data: { amount },
      },
      HttpStatus.EXPECTATION_FAILED,
    );
  }
}
