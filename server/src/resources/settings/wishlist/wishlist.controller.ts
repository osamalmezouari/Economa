import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

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

  @Get('withproducts')
  async findwishlistsByUserId(@activeUser('sub') userId: string) {
    const wishlists = await this.wishlistService.findwishlistsByUserId(userId);
    return wishlists;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wishlist = await this.wishlistService.findOne(id);
    return wishlist;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const wishlist = await this.wishlistService.remove(id);
    return wishlist;
  }
}
