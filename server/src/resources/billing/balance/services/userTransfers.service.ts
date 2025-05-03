import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MakeTransferDto } from '../dto/make-transfer.dto';
import { v4 as uuid } from 'uuid';

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

  async getUserTransfer(userId: string, page: number) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const transfers = await this.prisma.userTransfers.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      take: pageSize,
      skip: skip,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalTransfers = await this.prisma.userTransfers.count({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
    });

    return {
      transfers: transfers.map((transfer) => ({
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
      })),
      pageCount: Math.ceil(totalTransfers / pageSize),
    };
  }

  async makeTransfer(userId: string, makeTransferDto: MakeTransferDto) {
    const { receiverEmail, amount, description } = makeTransferDto;
    
    // Find sender user and check if they exist
    const sender = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { balance: true },
    });

    if (!sender) {
      throw new NotFoundException('Sender user not found');
    }

    // Find recipient user by email
    const recipient = await this.prisma.user.findUnique({
      where: { email: receiverEmail },
      include: { balance: true },
    });

    if (!recipient) {
      throw new NotFoundException('Recipient user not found');
    }

    // Check if sender is trying to send money to themselves
    if (sender.id === recipient.id) {
      throw new BadRequestException('Cannot transfer money to yourself');
    }

    // Check if sender has enough balance
    if (sender.balance.Balance < amount) {
      throw new BadRequestException('Insufficient balance for this transfer');
    }

    // Perform the transfer in a transaction to ensure data consistency
    return this.prisma.$transaction(async (prisma) => {
      // Deduct amount from sender's balance
      await prisma.balance.update({
        where: { userId: sender.id },
        data: { Balance: sender.balance.Balance - amount },
      });

      // Add amount to recipient's balance
      await prisma.balance.update({
        where: { userId: recipient.id },
        data: { Balance: recipient.balance.Balance + amount },
      });

      // Create transfer record
      const transfer = await prisma.userTransfers.create({
        data: {
          id: uuid(),
          senderId: sender.id,
          receiverId: recipient.id,
          amount,
          description: description || 'Transfer',
        },
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

      return {
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
      };
    });
  }
}
