import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon_NOT_FOUND_Exception } from '../../../common/exceptions/Coupon_NOT_FOUND.exception';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponDto: CreateCouponDto) {
    const coupon = await this.prisma.coupon.create({
      data: { id: uuid(), ...createCouponDto },
    });
    return coupon;
  }

  async findAll() {
    const coupons = await this.prisma.coupon.findMany();
    return coupons;
  }

  async findOne(id: string) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (coupon) return coupon;
    throw new Coupon_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    await this.findOne(id);
    const coupon = await this.prisma.coupon.update({
      where: { id },
      data: updateCouponDto,
    });
    return coupon;
  }

  async remove(id: string) {
    await this.findOne(id);
    const coupon = await this.prisma.coupon.delete({ where: { id } });
    return coupon;
  }
}
