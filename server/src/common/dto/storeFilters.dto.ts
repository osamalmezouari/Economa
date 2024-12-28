import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class StoreFiltersDto {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  search: string;

  @IsOptional()
  @IsString()
  weight: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 1 : parsedValue;
  })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Transform(({ value }) => parseFloat(value))
  Minprice: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  Maxprice: number;

  @IsOptional()
  @IsString()
  @IsIn([
    'price-asc',
    'price-desc',
    'rating-asc',
    'rating-desc',
    'name-asc',
    'name-desc',
  ])
  sort: string;
}
