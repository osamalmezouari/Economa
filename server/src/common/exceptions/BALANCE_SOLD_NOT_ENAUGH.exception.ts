import { HttpException, HttpStatus } from '@nestjs/common';

export class BALANCE_SOLD_NOT_ENAUGH_Exception extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.PAYMENT_REQUIRED,
        message: `Insufficient balance/sold to complete the operation`,
        errorCode: 'BALANCE_SOLD_NOT_ENOUGH',
        data: {
          details:
            'The requested operation requires more balance/sold than currently available',
        },
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  }
}
