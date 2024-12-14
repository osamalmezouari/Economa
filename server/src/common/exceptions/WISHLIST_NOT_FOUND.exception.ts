import { HttpException, HttpStatus } from '@nestjs/common';

export class WISHLIST_NOT_FOUND_Exception extends HttpException {
  constructor(wishlistId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No Wishlist item found with this wishlist id : ${wishlistId}`,
        errorCode: 'WISHLIST_ITEM_NOT_FOUND',
        data: { wishlistId },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
