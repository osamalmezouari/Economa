import { HttpException, HttpStatus } from '@nestjs/common';

export class NOTIFICATION_NOT_FOUND_Exception extends HttpException {
  constructor(notificationId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The notification with ID ${notificationId} does not exist.`,
        errorCode: 'NOTIFICATION_NOT_FOUND',
        data: { notificationId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
