import { HttpException, HttpStatus } from '@nestjs/common';

export class GALLERY_NOT_FOUND_Exception extends HttpException {
  constructor(galleryId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `The gallery with ID ${galleryId} does not exist.`,
        errorCode: 'GALLERY_NOT_FOUND',
        data: { galleryId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
