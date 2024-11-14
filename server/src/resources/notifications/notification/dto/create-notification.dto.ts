import { IsString, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId?: string;

  @IsString()
  type?: string;

  @IsString()
  message?: string;

  @IsBoolean()
  isRead?: boolean;
}
