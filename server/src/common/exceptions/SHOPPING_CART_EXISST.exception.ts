import { HttpException, HttpStatus } from '@nestjs/common';

export class SHOPPING_CART_EXISST_Exception extends HttpException {
  constructor(productname: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `the ${productname} is already exist in your cart`,
        errorCode: 'SHOPPING_CART_NOT_FOUND',
        data: { productname },
      },
      HttpStatus.AMBIGUOUS,
    );
  }
}
