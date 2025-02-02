import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  
/*   @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.create(createPaymentDto);
    return payment;
  } */

  @Get()
  async findAll() {
    const payment = await this.paymentService.findAll();
    return payment;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const payment = await this.paymentService.findOne(id);
    return payment;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    const payment = await this.paymentService.update(id, updatePaymentDto);
    return payment;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const payment = await this.paymentService.remove(id);
    return payment;
  }
}
