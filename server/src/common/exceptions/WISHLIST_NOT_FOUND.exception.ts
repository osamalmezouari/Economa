import { HttpException, HttpStatus } from '@nestjs/common';

export class WISHLIST_NOT_FOUND_Exception extends HttpException {
  constructor(WishtId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No user found with the provided id : ${WishtId}`,
        errorCode: 'USER_NOT_FOUND',
        data: { WishtId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
