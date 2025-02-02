import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateRefillbalancerequestDto {
  @IsString()
  paymentType: 'cash' | 'bank-transfer';
  file: Express.Multer.File | null;
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  amount: number;
}
