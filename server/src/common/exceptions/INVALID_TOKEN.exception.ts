import { HttpException, HttpStatus } from '@nestjs/common';

export class INVALID_TOKEN_Exception extends HttpException {
  constructor(token: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `The token code ${token} is invalid or has expired .`,
        errorCode: 'INVALID_COUPON',
        data: { token },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
