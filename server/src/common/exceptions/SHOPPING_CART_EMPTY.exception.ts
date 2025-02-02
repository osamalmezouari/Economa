import { HttpException, HttpStatus } from '@nestjs/common';

export class SHOPPING_CART_EMPTY_Exception extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `YOUR SHOOPING CART IS EMPTY`,
        errorCode: 'NO_SHOPPING_CART_ITEM_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
