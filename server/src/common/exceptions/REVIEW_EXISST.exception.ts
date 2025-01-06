import { HttpException, HttpStatus } from '@nestjs/common';

export class REVIEW_EXISST_Exception extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `You Are already make a review for this product`,
        errorCode: 'REVIEW_EXISST',
        data: {},
      },
      HttpStatus.CONFLICT,
    );
  }
}
