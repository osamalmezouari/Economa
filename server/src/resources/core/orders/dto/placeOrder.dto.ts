import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class PlaceOrderDto {
  @IsOptional()
  @IsString()
  couponCode: string;
}
