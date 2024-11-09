import { HttpException, HttpStatus } from '@nestjs/common';

export class PAYMENT_FAILED_Exception extends HttpException {
  constructor(transactionId: string, reason: string) {
    super(
      {
        statusCode: HttpStatus.PAYMENT_REQUIRED,
        message: `Payment could not be processed due to: ${reason}.`,
        errorCode: 'PAYMENT_FAILED',
        data: { transactionId, reason },
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  }
}
