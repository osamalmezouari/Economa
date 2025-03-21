import { HttpException, HttpStatus } from '@nestjs/common';

export class WISHLIST_EXISST_FOR_USER_Exception extends HttpException {
  constructor(productname: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `the ${productname} is already exist in your cart`,
        errorCode: 'WISHLIST_EXISST_FOR_USER',
        data: { productname },
      },
      HttpStatus.AMBIGUOUS,
    );
  }
}
