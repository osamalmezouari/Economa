import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsString()
  altText?: string;

  @IsString()
  productId?: string;
}
