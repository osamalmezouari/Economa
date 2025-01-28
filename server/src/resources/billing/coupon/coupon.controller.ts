import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/verify')
  async verify(
    @Body() data: { code: string  },
    @activeUser('sub') userId: string,
  ) {
    return await this.couponService.verify({
      code: data.code,
      userId,
    });
  }

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    const coupon = await this.couponService.create(createCouponDto);
    return coupon;
  }

  @Get()
  async findAll() {
    return await this.couponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.couponService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return await this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.couponService.remove(id);
  }
}
