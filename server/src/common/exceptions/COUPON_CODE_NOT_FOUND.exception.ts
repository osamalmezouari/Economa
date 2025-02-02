import { HttpException, HttpStatus } from '@nestjs/common';

export class COUPON_CODE_NOT_FOUND_Exception extends HttpException {
  constructor(code: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `INVALID COUPON ${code}`,
        errorCode: 'COUPON_CODE_NOT_FOUND',
        data: { code },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
