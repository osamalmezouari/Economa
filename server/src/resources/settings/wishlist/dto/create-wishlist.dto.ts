import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWishlistDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
