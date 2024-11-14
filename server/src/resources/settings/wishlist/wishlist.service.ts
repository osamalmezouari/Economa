import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { v4 as uuid } from 'uuid';
import { WISHLIST_NOT_FOUND_Exception } from '../../../common/exceptions/WISHLIST_NOT_FOUND.exception';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const wishlist = await this.prisma.wishlist.create({
      data: { id: uuid(), ...createWishlistDto },
    });
    return wishlist;
  }

  async findAll() {
    const wishlists = await this.prisma.wishlist.findMany();
    return wishlists;
  }

  async findOne(id: string) {
    const wishlist = await this.prisma.wishlist.findUnique({ where: { id } });
    if (!wishlist) throw new WISHLIST_NOT_FOUND_Exception(id);
    return wishlist;
  }

  async findByUserId(userId: string) {
    const wishlists = await this.prisma.wishlist.findMany({
      where: { userId },
    });
    if (!wishlists.length)
      throw new WISHLIST_NOT_FOUND_Exception(`User ID: ${userId}`);
    return wishlists;
  }

  async update(id: string, updateWishlistDto: UpdateWishlistDto) {
    await this.findOne(id);
    const wishlist = await this.prisma.wishlist.update({
      where: { id },
      data: updateWishlistDto,
    });
    return wishlist;
  }

  async remove(id: string) {
    await this.findOne(id);
    const wishlist = await this.prisma.wishlist.delete({ where: { id } });
    return wishlist;
  }
}
