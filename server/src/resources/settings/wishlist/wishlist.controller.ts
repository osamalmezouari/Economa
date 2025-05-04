import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.WISHLIST_CREATE)
  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @activeUser('sub') userId: string,
  ) {
    const wishlist = await this.wishlistService.create(
      createWishlistDto.productId,
      userId,
    );
    return wishlist;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.WISHLIST_READ)
  @Get('withproducts')
  async findwishlistsByUserId(@activeUser('sub') userId: string) {
    const wishlists = await this.wishlistService.findwishlistsByUserId(userId);
    return wishlists;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.WISHLIST_READ)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wishlist = await this.wishlistService.findOne(id);
    return wishlist;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.WISHLIST_DELETE)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const wishlist = await this.wishlistService.remove(id);
    return wishlist;
  }
}
