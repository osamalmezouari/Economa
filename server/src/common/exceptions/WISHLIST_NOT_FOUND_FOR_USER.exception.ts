import { HttpException, HttpStatus } from '@nestjs/common';

export class WISHLIST_NOT_FOUND_FOR_USER_Exception extends HttpException {
  constructor(userId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No Wishlist item found with the provided USER id : ${userId}`,
        errorCode: 'WISHLIST_NOT_FOUND_FOR_USER',
        data: { userId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
