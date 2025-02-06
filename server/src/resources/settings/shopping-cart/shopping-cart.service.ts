import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { v4 as uuid } from 'uuid';
import { SHOPPING_CART_NOT_FOUND_Exception } from '../../../common/exceptions/SHOPPING_CART_NOT_FOUND.exception';
import { SHOPPING_CART_ITEM_EXISST_FOR_USER_Exception } from 'src/common/exceptions/SHOPPING_CART_EXISST_FOR_USER.exception';
import { SHOPPING_CART_EMPTY_Exception } from 'src/common/exceptions/SHOPPING_CART_EMPTY.exception';

@Injectable()
export class ShoppingCartService {
  constructor(private readonly prisma: PrismaService) {}

  /*   async findAll() {
    const shoppingCarts = await this.prisma.shoppingCart.findMany();
    return shoppingCarts;
  } */

  async findShoppingCartByUserId(userId: string) {
    const shoppingCarts = await this.prisma.shoppingCart.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        quantity: true,
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
    if (!shoppingCarts.length) {
      throw new SHOPPING_CART_EMPTY_Exception();
    }
    const shoppingCartsWithProduct = shoppingCarts.map((item) => {
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
        quantity: item.quantity,
      };
    });

    return shoppingCartsWithProduct;
  }

  async findOne(id: string) {
    const shoppingCart = await this.prisma.shoppingCart.findUnique({
      where: { id: id },
    });
    if (!shoppingCart) throw new SHOPPING_CART_NOT_FOUND_Exception(id);
    return shoppingCart;
  }

  async create(userId: string, createShoppingCartDto: CreateShoppingCartDto) {
    const productinfo = await this.prisma.product.findUnique({
      where: { id: createShoppingCartDto.productId },
    });
    const { productId, quantity = 1 } = createShoppingCartDto;
    const existingCartItem = await this.prisma.shoppingCart.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    if (existingCartItem) {
      throw new SHOPPING_CART_ITEM_EXISST_FOR_USER_Exception(productinfo.name);
    }
    const shoppingCart = await this.prisma.shoppingCart.create({
      data: {
        id: uuid(),
        userId: userId,
        productId: productId,
        quantity: quantity,
      },
    });
    return shoppingCart;
  }

  async updatequantity(id: string, userId: string, quantity: number) {
    await this.findOne(id);
    const shoppingCart = await this.prisma.shoppingCart.update({
      where: { id: id, user: { id: userId } },
      data: {
        quantity: quantity,
      },
    });
    console.log(shoppingCart);
    return shoppingCart;
  }

  async remove(id: string) {
    await this.findOne(id);
    const shoppingCart = await this.prisma.shoppingCart.delete({
      where: { id },
    });
    return shoppingCart;
  }

  async clearshoopingCart(userId: string) {
    await this.prisma.shoppingCart.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}
