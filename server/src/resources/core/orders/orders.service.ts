import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { ORDER_NOT_FOUND_Exception } from 'src/common/exceptions/ORDER_NOT_FOUND.exception';
import { PlaceOrderDto } from './dto/placeOrder.dto';
import { CouponService } from 'src/resources/billing/coupon/coupon.service';
import { ShoppingCartService } from 'src/resources/settings/shopping-cart/shopping-cart.service';
import { BalanceService } from 'src/resources/billing/balance/balance.service';
import { PaymentService } from 'src/resources/billing/payment/payment.service';

@Injectable()
export class OrdersService {
  totalOrderAmount: number;
  couponId?: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly couponservice: CouponService,
    private readonly shoppingcartservice: ShoppingCartService,
    private readonly balanceService: BalanceService,
    private readonly paymentService: PaymentService,
  ) {}

  async PlaceAndPayOrder({ couponCode }: PlaceOrderDto, userId: string) {
    const shoppingCartItemsDetails =
      await this.shoppingcartservice.findShoppingCartByUserId(userId);

    // Calculate total amount
    const totalOriginalAmount = shoppingCartItemsDetails.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0,
    );

    // Add tax (20%)
    this.totalOrderAmount = parseFloat((totalOriginalAmount * 1.2).toFixed(2)); // 👈 Set here

    if (couponCode) {
      const { discount_type, discount_value, couponId } =
        await this.couponservice.verify(
          {
            code: couponCode,
            orderAmountValue: this.totalOrderAmount, // 👈 Use here
          },
          userId,
        );
      this.couponId = couponId;
      if (discount_type === 'Percentage') {
        this.totalOrderAmount *= 1 - discount_value / 100; // Apply % discount
      } else if (discount_type === 'Flat') {
        this.totalOrderAmount -= discount_value; // Apply fixed discount
      }

      this.totalOrderAmount = parseFloat(this.totalOrderAmount.toFixed(2));
    }

    const verified = await this.balanceService.verifyBalance({
      userId: userId,
      orderAmount: this.totalOrderAmount,
    });
    if (verified) {
      const order = await this.prisma.order.create({
        data: {
          id: uuid(),
          totalAmount: this.totalOrderAmount || 0,
          userId: userId,
          couponId: this.couponId,
          status: 'paid',
        },
      });
      for (const item of shoppingCartItemsDetails) {
        const originalItemAmount = item.productPrice * item.quantity;
        const proportionalDiscount =
          (originalItemAmount / totalOriginalAmount) *
          (totalOriginalAmount - this.totalOrderAmount);
        const discountedUnitPrice = parseFloat(
          (
            (item.productPrice * (originalItemAmount - proportionalDiscount)) /
            item.quantity
          ).toFixed(2),
        );

        await this.prisma.orderItem.create({
          data: {
            id: uuid(),
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: discountedUnitPrice,
          },
        });
      }
      await this.paymentService.payOrder({
        orderId: order.id,
        amount: this.totalOrderAmount,
      });

      await this.shoppingcartservice.clearshoopingCart(userId);
      return {
        orderId: order.id,
      };
    }
  }
  /*   async create(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { id: uuid(), ...createOrderDto },
    });
    return order;
  }

  async findAll() {
    const order = await this.prisma.order.findMany();
    return order;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (order) return order;
    throw new ORDER_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    const order = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
    return order;
  }

  async remove(id: string) {
    await this.findOne(id);
    const order = await this.prisma.order.delete({ where: { id } });
    return order;
  } */
}
