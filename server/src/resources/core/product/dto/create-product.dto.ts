import { IsInt, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;
    @IsString()
    @MaxLength(150)
    description: string;
    @IsNumber()
    price: number;
    @IsInt()
    stock: number;
    @IsUUID()
    categoryId?: string;
}
