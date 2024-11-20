import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsString()
  productId: string;
}
