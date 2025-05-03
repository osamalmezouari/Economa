import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { verfy_coupon } from './dto/verifyCoupon.dto';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.COUPON_VERIFY)
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verify(@Body() data: verfy_coupon, @activeUser('sub') userId: string) {
    return await this.couponService.verify(data, userId);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.COUPON_CREATE)
  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    const coupon = await this.couponService.create(createCouponDto);
    return coupon;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.COUPON_READ)
  @Get()
  async findAll() {
    return await this.couponService.findAll();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.COUPON_READ)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.couponService.findOne(id);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.COUPON_UPDATE)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return await this.couponService.update(id, updateCouponDto);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.COUPON_DELETE)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.couponService.remove(id);
  }
}
