import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SalesXProfit {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  year: number;
}
