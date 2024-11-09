import { HttpException, HttpStatus } from '@nestjs/common';

export class PRODUCT_NOT_FOUND_Exception extends HttpException {
  constructor(productId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The product with ID ${productId} does not exist.`,
        errorCode: 'PRODUCT_NOT_FOUND',
        data: { productId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
