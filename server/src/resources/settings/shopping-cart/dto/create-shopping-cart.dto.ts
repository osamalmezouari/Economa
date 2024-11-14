import { IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class CreateShoppingCartDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  quantity: number;
}
