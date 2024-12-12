import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  async findAll() {
    const shoppingCarts = await this.shoppingCartService.findAll();
    return shoppingCarts;
  }

  @AUTH(AuthenticationType.bearer)
  @Get('WithProducts') // shopping cart from a single user with some details of product like unit | price with discount | product name | product image
  async findAllWithProducts(@activeUser('sub') userId: string) {
    const shoppingCarts =
      await this.shoppingCartService.findByUserIdWithProducts(userId);
    return shoppingCarts;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shoppingCart = await this.shoppingCartService.findOne(id);
    return shoppingCart;
  }

  @Post()
  async create(
    @Body() createShoppingCartDto: CreateShoppingCartDto,
    @activeUser('sub') userId: string,
  ) {
    const shoppingCart = await this.shoppingCartService.create(
      userId,
      createShoppingCartDto,
    );
    return shoppingCart;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @activeUser('sub') userId: string,
    @Body() body: { quantity: number }, // Corrected: body instead of quantity
  ) {
    const shoppingCart = await this.shoppingCartService.update(
      id,
      userId,
      body.quantity, // Access the quantity directly here
    );
    return shoppingCart;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const shoppingCart = await this.shoppingCartService.remove(id);
    return shoppingCart;
  }
}
