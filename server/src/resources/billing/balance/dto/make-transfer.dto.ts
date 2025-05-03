import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class MakeTransferDto {
  @IsEmail()
  @IsNotEmpty()
  receiverEmail: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}