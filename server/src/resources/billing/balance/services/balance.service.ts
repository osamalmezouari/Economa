import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BALANCE_SOLD_NOT_ENAUGH_Exception } from 'src/common/exceptions/BALANCE_SOLD_NOT_ENAUGH.exception';
import { verifyBalanceDto } from '../dto/verifyBalance';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return 'This action returns all refill balance requests.';
  }

  findOne(id: number) {
    return `This action returns a #${id} refill balance request.`;
  }

  async getCardInfo(userId: string) {
    const userCardInfo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        balance: true,
      },
    });
    return {
      balance: userCardInfo.balance.Balance,
      name: userCardInfo.name,
    };
  }

  async verifyBalance({ userId, orderAmount }: verifyBalanceDto) {
    const balance = await this.prisma.balance.findUnique({
      where: {
        userId: userId,
      },
    });
    if (balance.Balance < orderAmount) {
      throw new BALANCE_SOLD_NOT_ENAUGH_Exception();
    }
    await this.prisma.balance.update({
      where: {
        userId: userId,
      },
      data: {
        Balance: balance.Balance - orderAmount,
      },
    });
    return true;
  }


  
}
