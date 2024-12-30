import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name?: string;
  @IsEmail()
  email: string;
  @MaxLength(12)
  password: string;
  @IsUUID()
  roleId: string;
  @IsPhoneNumber()
  phoneNumber: string;
  @IsString()
  address: string;
}
