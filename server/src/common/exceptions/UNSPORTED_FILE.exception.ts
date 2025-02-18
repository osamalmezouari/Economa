import { HttpException, HttpStatus } from '@nestjs/common';

export class Unsupported_FILE_Exception extends HttpException {
  constructor(fileextenssion: string) {
    super(
      {
        statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        message: `Unsupported file format ${fileextenssion}. Allowed formats are: PNG, JPG, JPEG`,
        errorCode: 'Unsupported_file_format',
        data: { fileextenssion },
      },
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    );
  }
}
