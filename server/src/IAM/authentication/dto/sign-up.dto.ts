import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10, { message: 'Password must be at least 10 characters long' })
  password: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
