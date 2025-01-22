import { Injectable } from '@nestjs/common';
import { CreateRefillbalancerequestDto } from './dto/create-refillbalancerequest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RefillbalancerequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    userId: string,
  ) {
    try {
      if (!createRefillbalancerequestDto.file) {
        throw new Error('No file provided in the request.');
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

      return refillbalancerequest;
    } catch (error) {
      throw new Error(
        `Error while creating refill balance request: ${error.message}`,
      );
    }
  }

  private storeFile(userId: string, file: Express.Multer.File): string {
    const documentsRoot = path.join(__dirname, '..', '..', 'documents');
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

  findAll() {
    return 'This action returns all refill balance requests.';
  }

  findOne(id: number) {
    return `This action returns a #${id} refill balance request.`;
  }
}
