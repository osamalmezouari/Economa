import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  discount_type: 'Percentage' | 'Flat';

  @IsPositive()
  discount_value: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  max_usage?: number;

  @IsDateString()
  @IsOptional()
  expiration_date?: Date;

  @IsPositive()
  @IsOptional()
  minimum_order_value?: number;
}
