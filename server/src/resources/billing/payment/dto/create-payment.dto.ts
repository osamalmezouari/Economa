import { IsString, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  orderId: string;

  @IsPositive()
  amount: number;

  @IsString()
  paymentStatus: 'pending' | 'paied';

  @IsString()
  paymentMethod?: string;

  @IsString()
  transactionId: string;
}
