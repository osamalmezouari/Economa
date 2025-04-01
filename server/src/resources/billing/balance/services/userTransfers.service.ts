import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersTransfersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsersTransfers() {
    const transfers = await this.prisma.userTransfers.findMany({
      take: 10,
      include: {
        sender: {
          select: {
            email: true,
            name: true,
            avatar: true, 
          },
        },
        receiver: {
          select: {
            email: true,
            name: true,
            avatar: true, 
          },
        },
      },
    });

    return transfers.map((transfer) => ({
      id: transfer.id,
      amount: transfer.amount,
      description: transfer.description,
      createdAt: transfer.createdAt,
      sender: {
        email: transfer.sender.email,
        name: transfer.sender.name,
        avatar: transfer.sender.avatar,
      },
      receiver: {
        email: transfer.receiver.email,
        name: transfer.receiver.name,
        avatar: transfer.receiver.avatar,
      },
    }));
  }
}
