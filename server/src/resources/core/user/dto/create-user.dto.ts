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
  @IsString()
  phoneNumber: string;
  @IsString()
  address: string;
  file: Express.Multer.File;
}
