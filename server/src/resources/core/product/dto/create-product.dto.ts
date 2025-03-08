import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  @MaxLength(200)
  description: string;
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  discount?: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  price: number;
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  cost_price: number;
  @IsUUID()
  categoryId: string;
  @IsOptional()
  stock: number;
  @IsString()
  unitname: string;
  file: Express.Multer.File;
}
