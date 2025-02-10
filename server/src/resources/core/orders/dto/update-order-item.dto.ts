import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from '../../orders/dto/create-order-item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
