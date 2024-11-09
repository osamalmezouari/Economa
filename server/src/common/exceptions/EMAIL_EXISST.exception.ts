import { HttpException, HttpStatus } from '@nestjs/common';

export class EMAIL_EXISST_Exception extends HttpException {
  constructor(email: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `Email already exists with ID ${email} try with other email address.`,
        errorCode: 'UNAUTHORIZED_ACCESS',
        data: { email },
      },
      HttpStatus.CONFLICT,
    );
  }
}
