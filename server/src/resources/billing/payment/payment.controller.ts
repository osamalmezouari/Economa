import { Controller, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PAYMENT_READ)
  @Get('transactions')
  async getPaymentTransactions(
    @Query('page') page: number,
    @Query('search') search: string,
  ) {
    const payment = await this.paymentService.getPaymentTransactions(
      page,
      search,
    );
    return payment;
  }
}
