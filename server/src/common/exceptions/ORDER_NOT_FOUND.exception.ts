import { HttpException, HttpStatus } from '@nestjs/common';

export class ORDER_NOT_FOUND_Exception extends HttpException {
  constructor(orderId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The order with ID ${orderId} does not exist.`,
        errorCode: 'ORDER_NOT_FOUND',
        data: { orderId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
