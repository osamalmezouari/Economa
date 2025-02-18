import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { CreateRefillbalancerequestDto } from '../dto/create-refillbalancerequest.dto';
import { Unsupported_FILE_Exception } from 'src/common/exceptions/UNSPORTED_FILE.exception';

@Injectable()
export class RefillBalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async refilbalanceRequestcreate(
    createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    userId: string,
  ) {
    let requestId = '';
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
        requestId = refillbalancerequest.id;
        return {
          reqStatus: {
            statusCode: 201,
            message: 'Refill balance Registred successfully',
          },
          ...refillbalancerequest,
        };
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
      requestId = refillbalancerequest.id;

      await this.prisma.refillBalanceRequestStatus.create({
        data: {
          id: uuid(),
          status: 'pending',
          requestId: requestId,
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

  private storeFile(userId: string, file: Express.Multer.File): string {
    const documentsRoot = path.join(
      'D:\\Oussama\\PROJECTS\\Economa',
      'Ecommerce_payments_documents',
    );
    const userFolder = path.join(documentsRoot, userId);
    const currentYear = new Date().getFullYear().toString();
    d
    const yearFolder = path.join(userFolder, currentYear);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      throw new Unsupported_FILE_Exception(fileExtension);
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
