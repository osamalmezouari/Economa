import { IsNotEmpty, IsInt, IsUUID, IsNumber } from 'class-validator';

export class CreateShoppingCartDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  quantity?: number;
}
