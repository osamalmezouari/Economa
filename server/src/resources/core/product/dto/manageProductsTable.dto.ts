import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class ManageProductsTableDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number; // Not optional because it always defaults to 1

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  min_price?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  max_price?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  min_stock?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  max_stock?: number;
}
