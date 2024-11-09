import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10, { message: 'Password must be at least 10 characters long' })
  password: string;
}
