import { Injectable } from '@nestjs/common';
import { CreateRefillbalancerequestDto } from './dto/create-refillbalancerequest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { BALANCE_SOLD_NOT_ENAUGH_Exception } from 'src/common/exceptions/BALANCE_SOLD_NOT_ENAUGH.exception';
import { verifyBalanceDto } from './dto/verifyBalance';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return 'This action returns all refill balance requests.';
  }

  findOne(id: number) {
    return `This action returns a #${id} refill balance request.`;
  }
  async refilbalanceRequestcreate(
    createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    userId: string,
  ) {
    try {
      if (!createRefillbalancerequestDto.file) {
        const refillbalancerequest =
          await this.prisma.refillBalanceRequest.create({
            data: {
              id: uuid(),
              amount: createRefillbalancerequestDto.amount,
              status: 'pending',
              userId: userId,
              file: 'no file',
            },
          });

        return refillbalancerequest;
      }
      const filePath = this.storeFile(
        userId,
        createRefillbalancerequestDto.file,
      );
      const refillbalancerequest =
        await this.prisma.refillBalanceRequest.create({
          data: {
            id: uuid(),
            amount: createRefillbalancerequestDto.amount,
            status: 'pending',
            userId: userId,
            file: filePath,
          },
        });

      return {
        reqStatus: {
          statusCode: 201,
          message: 'Refill balance Registred successfully',
        },
        ...refillbalancerequest,
      };
    } catch (error) {
      throw new Error(
        `Error while creating refill balance request: ${error.message}`,
      );
    }
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

  private storeFile(userId: string, file: Express.Multer.File): string {
    const documentsRoot = path.join(
      'D:\\Oussama\\PROJECTS\\Ecommerce',
      'Ecommerce_payments_documents',
    );
    const userFolder = path.join(documentsRoot, userId);
    const currentYear = new Date().getFullYear().toString();
    const yearFolder = path.join(userFolder, currentYear);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.pdf'].includes(fileExtension)) {
      throw new Error(
        'Unsupported file format. Allowed formats are: PNG, JPG, JPEG, PDF.',
      );
    }
    const fileName = `${userId}_${new Date().toISOString().replace(/:/g, '-')}${fileExtension}`;
    const filePath = path.join(yearFolder, fileName);
    try {
      if (!fs.existsSync(yearFolder)) {
        fs.mkdirSync(yearFolder, { recursive: true });
      }
      fs.writeFileSync(filePath, file.buffer);
      return filePath;
    } catch (error) {
      throw new Error(`Error while storing file: ${error.message}`);
    }
  }
}
