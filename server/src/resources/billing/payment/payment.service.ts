import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PAYMENT_NOT_FOUND_Exception } from '../../../common/exceptions/PAYMENT_NOT_FOUND.exception';
import { v4 as uuid } from 'uuid';
import { BalanceService } from '../balance/services/balance.service';
import { PayOrderDto } from './dto/payOrder.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async payOrder(payOrderData: PayOrderDto) {
    return await this.prisma.payment.create({
      data: {
        id: uuid(),
        amount: payOrderData.amount,
        orderId: payOrderData.orderId,
      },
    });
  }

  /*   async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.prisma.payment.create({
      data: { id: uuid(), ...createPaymentDto },
    });
    return payment;
  } */

  async findAll() {
    const payment = await this.prisma.payment.findMany();
    return payment;
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new PAYMENT_NOT_FOUND_Exception(id);
    }
    return payment;
  }

  async getPaymentTransactions(page: number, search: string) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const payments = await this.prisma.payment.findMany({
      where: {
        OR: [
          {
            order: {
              id: {
                contains: search,
              },
            },
          },
          {
            order: {
              user: {
                OR: [
                  { name: { contains: search } },
                  { email: { contains: search } },
                ],
              },
            },
          },
        ],
      },
      include: {
        order: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
      skip,
      take: pageSize,
      orderBy: {
        order: {
          createdAt: 'desc',
        },
      },
    });

    const totalCount = await this.prisma.payment.count({
      where: {
        OR: [
          {
            order: {
              id: {
                contains: search,
              },
            },
          },
          {
            order: {
              user: {
                OR: [
                  { name: { contains: search } },
                  { email: { contains: search } },
                ],
              },
            },
          },
        ],
      },
    });

    return {
      payments,
      pageCount: Math.ceil(totalCount / pageSize),
    };
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    await this.findOne(id);
    const payment = await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
    return payment;
  }

  async remove(id: string) {
    await this.findOne(id);
    const payment = await this.prisma.payment.delete({ where: { id } });
    return payment;
  }
}
