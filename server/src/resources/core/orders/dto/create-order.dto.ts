import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsUUID()
    userId: string;
    @IsUUID()
    couponId: string;
    @IsString()
    shippingAddress: string;
    @IsString()
    billingAddress: string;
    @IsNumber()
    totalAmount: number;
    @IsString()
    status?: string;
}
