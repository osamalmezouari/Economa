import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { v4 as uuid } from 'uuid';
import { SHOPPING_CART_NOT_FOUND_Exception } from '../../../common/exceptions/SHOPPING_CART_NOT_FOUND.exception';

@Injectable()
export class ShoppingCartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    const shoppingCart = await this.prisma.shoppingCart.create({
      data: { id: uuid(), ...createShoppingCartDto },
    });
    return shoppingCart;
  }

  async findAll() {
    const shoppingCarts = await this.prisma.shoppingCart.findMany();
    return shoppingCarts;
  }

  async findOne(id: string) {
    const shoppingCart = await this.prisma.shoppingCart.findUnique({
      where: { id },
    });
    if (!shoppingCart) throw new SHOPPING_CART_NOT_FOUND_Exception(id);
    return shoppingCart;
  }

  async findByUserId(userId: string) {
    const shoppingCarts = await this.prisma.shoppingCart.findMany({
      where: { userId },
    });
    if (!shoppingCarts.length)
      throw new SHOPPING_CART_NOT_FOUND_Exception(`User ID: ${userId}`);
    return shoppingCarts;
  }

  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto) {
    await this.findOne(id);
    const shoppingCart = await this.prisma.shoppingCart.update({
      where: { id },
      data: updateShoppingCartDto,
    });
    return shoppingCart;
  }

  async remove(id: string) {
    await this.findOne(id);
    const shoppingCart = await this.prisma.shoppingCart.delete({
      where: { id },
    });
    return shoppingCart;
  }
}
