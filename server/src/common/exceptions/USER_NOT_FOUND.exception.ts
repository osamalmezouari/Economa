import { HttpException, HttpStatus } from '@nestjs/common';

export class USER_NOT_FOUND_Exception extends HttpException {
  constructor(userId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No user found with the provided id : ${userId}`,
        errorCode: 'USER_NOT_FOUND',
        data: { userId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
