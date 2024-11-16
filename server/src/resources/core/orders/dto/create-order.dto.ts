import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  @IsOptional()
  couponId: string;

  @IsString()
  shippingAddress: string;

  @IsString()
  @IsOptional()
  billingAddress: string;

  @IsPositive()
  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;
}
