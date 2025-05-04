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
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @SET_PERMESSIONS(Permissions_TYPE.CART_READ)
  @AUTH(AuthenticationType.bearer)
  @Get('WithProducts')
  async findShoppingCartByUserId(@activeUser('sub') userId: string) {
    const shoppingCarts =
      await this.shoppingCartService.findShoppingCartByUserId(userId);
    return shoppingCarts;
  }

  @SET_PERMESSIONS(Permissions_TYPE.CART_CREATE)
  @AUTH(AuthenticationType.bearer)
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

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.CART_UPDATE)
  @Patch(':id')
  async updatequantity(
    @Param('id') id: string,
    @activeUser('sub') userId: string,
    @Body() quantity: { quantity: number },
  ) {
    const shoppingCart = await this.shoppingCartService.updatequantity(
      id,
      userId,
      quantity.quantity,
    );
    return shoppingCart;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.CART_DELETE)
  @Delete(':id')
  async remove(@Param('id') id: string, @activeUser('sub') userId: string) {
    const shoppingCart = await this.shoppingCartService.remove(id);
    return shoppingCart;
  }
}
