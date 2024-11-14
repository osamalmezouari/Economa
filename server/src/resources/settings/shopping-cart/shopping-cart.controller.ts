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

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  async create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    const shoppingCart = await this.shoppingCartService.create(
      createShoppingCartDto,
    );
    return shoppingCart;
  }

  @Get()
  async findAll() {
    const shoppingCarts = await this.shoppingCartService.findAll();
    return shoppingCarts;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shoppingCart = await this.shoppingCartService.findOne(id);
    return shoppingCart;
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    const shoppingCarts = await this.shoppingCartService.findByUserId(userId);
    return shoppingCarts;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    const shoppingCart = await this.shoppingCartService.update(
      id,
      updateShoppingCartDto,
    );
    return shoppingCart;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const shoppingCart = await this.shoppingCartService.remove(id);
    return shoppingCart;
  }
}
