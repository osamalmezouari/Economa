import { TransactionType } from '@prisma/client';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateStockTransactionDto {
  @IsUUID()
  productId: string;
  @IsString()
  transactionType: TransactionType;
  @IsNumber()
  quantity: number;
  @IsNumber()
  unitCost: number;
}
