import { HttpException, HttpStatus } from '@nestjs/common';

export class PAYMENT_NOT_FOUND_Exception extends HttpException {
  constructor(paymentId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The payment with ID ${paymentId} does not exist.`,
        errorCode: 'PAYMENT_NOT_FOUND',
        data: { paymentId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
