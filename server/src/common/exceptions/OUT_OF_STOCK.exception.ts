import { HttpException, HttpStatus } from '@nestjs/common';

export class OUT_OF_STOCK_Exception extends HttpException {
  constructor(productId: string, productName: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `The product ${productName} is currently out of stock.`,
        errorCode: 'OUT_OF_STOCK',
        data: { productId, productName },
      },
      HttpStatus.CONFLICT,
    );
  }
}
