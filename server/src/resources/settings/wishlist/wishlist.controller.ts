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
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    const wishlist = await this.wishlistService.create(createWishlistDto);
    return wishlist;
  }

  @Get()
  async findAll() {
    const wishlists = await this.wishlistService.findAll();
    return wishlists;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wishlist = await this.wishlistService.findOne(id);
    return wishlist;
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    const wishlists = await this.wishlistService.findByUserId(userId);
    return wishlists;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistService.update(id, updateWishlistDto);
    return wishlist;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const wishlist = await this.wishlistService.remove(id);
    return wishlist;
  }
}
