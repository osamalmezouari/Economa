import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { v4 as uuid } from 'uuid';
import { WISHLIST_NOT_FOUND_Exception } from '../../../common/exceptions/WISHLIST_NOT_FOUND.exception';
import { WISHLIST_NOT_FOUND_FOR_USER_Exception } from 'src/common/exceptions/WISHLIST_NOT_FOUND_FOR_USER.exception';
import { WISHLIST_EXISST_FOR_USER_Exception } from 'src/common/exceptions/WISHLIST_EXISST_FOR_USER.exception';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const wishlist = await this.prisma.wishlist.findUnique({ where: { id } });
    if (!wishlist) throw new WISHLIST_NOT_FOUND_Exception(id);
    return wishlist;
  }

  async create(productId: string, userId: string) {
    const WISHLIST_EXISST = await this.prisma.wishlist.findFirst({
      where: { id: productId, userId: userId },
    });
    const productinfo = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (WISHLIST_EXISST) {
      throw new WISHLIST_EXISST_FOR_USER_Exception(productinfo.name);
    }
    const wishlist = await this.prisma.wishlist.create({
      data: {
        id: uuid(),
        productId: productId,
        userId: userId,
      },
    });
    return wishlist;
  }

  async findwishlistsByUserId(userId: string) {
    const wishlists = await this.prisma.wishlist.findMany({
      where: { userId },
      select: {
        id: true,
        productId: true,
        product: {
          select: {
            name: true,
            price: true,
            discount: true,
            gallery: {
              select: {
                imageUrl: true,
              },
            },
            Units: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!(wishlists.length > 0)) {
      throw new WISHLIST_NOT_FOUND_FOR_USER_Exception(`${userId}`);
    }
    const wishlistWithProducts = wishlists.map((item) => {
      return {
        id: item.id,
        productName: item.product.name,
        productPrice: item.product.price * (1 - item.product.discount / 100),
        productunit: item.product.Units.name,
        productId: item.productId,
        svgLink:
          item.product.gallery.length > 0
            ? item.product.gallery[0].imageUrl
            : '',
      };
    });
    return wishlistWithProducts;
  }


  async remove(id: string) {
    await this.findOne(id);
    const wishlist = await this.prisma.wishlist.delete({ where: { id } });
    return wishlist;
  }
}
