import { HttpException, HttpStatus } from '@nestjs/common';

export class PERMISSION_NOT_FOUND_Exception extends HttpException {
  constructor(permissionId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The permission with ID ${permissionId} does not exist.`,
        errorCode: 'PERMISSION_NOT_FOUND',
        data: { permissionId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
