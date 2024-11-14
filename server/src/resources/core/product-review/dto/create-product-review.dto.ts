import { IsOptional, IsString, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateProductReviewDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  reviewText?: string;
}
