import { TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStockTransactionDto {
  @IsUUID()
  productId: string;
  @IsString()
  transactionType: TransactionType;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  unitCost?: number;
}
