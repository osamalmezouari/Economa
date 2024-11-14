import { HttpException, HttpStatus } from '@nestjs/common';

export class ROLE_NOT_FOUND_Exception extends HttpException {
  constructor(roleId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The role with ID ${roleId} does not exist.`,
        errorCode: 'ROLE_NOT_FOUND',
        data: { roleId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
