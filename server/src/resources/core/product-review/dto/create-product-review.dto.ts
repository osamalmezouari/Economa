import { IsOptional, IsString, IsInt, Min, Max, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductReviewDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  productId: string;
  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  rating: number;
  @IsOptional()
  @IsString()
  reviewText?: string;
}
