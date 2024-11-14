import { HttpException, HttpStatus } from '@nestjs/common';

export class CATEGORY_NOT_FOUND_Exception extends HttpException {
  constructor(categoryId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The category with ID ${categoryId} does not exist.`,
        errorCode: 'CATEGORY_NOT_FOUND',
        data: { categoryId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
