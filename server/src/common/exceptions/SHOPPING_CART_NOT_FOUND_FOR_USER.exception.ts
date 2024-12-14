import { HttpException, HttpStatus } from '@nestjs/common';

export class SHOPPING_CART_NOT_FOUND_FOR_USER_Exception extends HttpException {
  constructor(userId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No SHOPPING_CART found FOR USER with the provided USER id : ${userId}`,
        errorCode: 'SHOPPING_CART_NOT_FOUND_FOR_USER',
        data: { userId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
