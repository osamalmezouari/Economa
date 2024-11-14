import { HttpException, HttpStatus } from '@nestjs/common';

export class ORDER_ITEM_NOT_FOUND_Exception extends HttpException {
  constructor(orderitemId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The order_item with ID ${orderitemId} does not exist.`,
        errorCode: 'ORDER_ITEM_NOT_FOUND',
        data: { orderitemId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
