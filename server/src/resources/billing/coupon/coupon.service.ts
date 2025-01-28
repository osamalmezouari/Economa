import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon_NOT_FOUND_Exception } from '../../../common/exceptions/Coupon_NOT_FOUND.exception';
import { v4 as uuid } from 'uuid';
import { COUPON_USAGE_LIMIT_EXCEEDED_Exception } from 'src/common/exceptions/COUPON_USAGE_LIMIT_EXCEEDED.exception';
import { COUPON_ALREADY_USED_Exception } from 'src/common/exceptions/COUPON_ALREADY_USED.exception';
import { COUPON_EXPIRED_Exception } from 'src/common/exceptions/COUPON_EXPIRED.exception';
import { COUPON_NOT_ASSIGNED_Exception } from 'src/common/exceptions/COUPON_NOT_ASSIGNED.exception';

@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}

  async verify({ code, userId }: { code: string; userId: string }) {
    // Step 1: Check if the coupon exists based on the code
    const coupon = await this.prisma.coupon.findFirst({
      where: { code }, // Use coupon code to fetch the coupon
      select: {
        id: true, // Internal ID, which is used for other operations like orders
        max_usage: true,
        expiration_date: true,
        users: true,
        orders: true,
      },
    });

    if (!coupon) {
      throw new Coupon_NOT_FOUND_Exception(code); // Coupon not found
    }

    // Step 2: Check if the coupon usage limit has been exceeded
    if (coupon.max_usage !== null && coupon.orders.length >= coupon.max_usage) {
      throw new COUPON_USAGE_LIMIT_EXCEEDED_Exception(code);
    }

    // Step 3: Check if the user has already used the coupon
    const couponAlreadyUsed = await this.prisma.order.findFirst({
      where: { userId, couponId: coupon.id }, // Use coupon's internal id to check orders
    });

    if (couponAlreadyUsed) {
      throw new COUPON_ALREADY_USED_Exception(code, userId); // User has already used the coupon
    }

    // Step 4: Check if the coupon has expired
    if (
      coupon.expiration_date &&
      new Date(coupon.expiration_date) <= new Date()
    ) {
      throw new COUPON_EXPIRED_Exception(code); // Coupon has expired
    }

    // Step 5: Verify if the coupon is assigned to the user
    const userHasCoupon = coupon.users.some((user) => user.id === userId);

    if (!userHasCoupon) {
      throw new COUPON_NOT_ASSIGNED_Exception(code, userId); // Coupon not assigned to the user
    }

    // Step 6: Return success if all conditions are met
    return { code, verified: true }; // Coupon successfully verified
  }

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
