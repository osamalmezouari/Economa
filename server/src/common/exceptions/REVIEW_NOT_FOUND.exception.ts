import { HttpException, HttpStatus } from '@nestjs/common';

export class REVIEW_NOT_FOUND_Exception extends HttpException {
  constructor(reviewId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The product review  with ID ${reviewId} does not exist.`,
        errorCode: 'REVIEW_NOT_FOUND',
        data: { reviewId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
