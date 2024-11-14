import { HttpException, HttpStatus } from '@nestjs/common';

export class SHOPPING_CART_NOT_FOUND_Exception extends HttpException {
  constructor(Shopping_cartId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No user found with the provided id : ${Shopping_cartId}`,
        errorCode: 'USER_NOT_FOUND',
        data: { Shopping_cartId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
