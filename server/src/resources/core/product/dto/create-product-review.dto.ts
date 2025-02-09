import {
  IsOptional,
  IsString,
  Min,
  Max,
  IsUUID,
  IsEmail,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductReviewDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsUUID()
  productId: string;
  @IsNumber()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseFloat(value))
  rating: number;
  @IsOptional()
  @IsString()
  reviewText?: string;
}
