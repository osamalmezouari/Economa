import { HttpException, HttpStatus } from '@nestjs/common';

export class UNAUTHORIZED_ACCESS_Exception extends HttpException {
  constructor(resourceId: string, userId: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: `You do not have permission to access this resource.`,
        errorCode: 'UNAUTHORIZED_ACCESS',
        data: { resourceId, userId },
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
