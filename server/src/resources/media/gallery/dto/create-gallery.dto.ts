import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  imagePath: string;

  @IsString()
  altText?: string;

  @IsString()
  productId?: string;
}
