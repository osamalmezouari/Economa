import { Module } from '@nestjs/common';
import { BalanceService } from './services/balance.service';
import { BalanceController } from './balance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RefillBalanceService } from './services/refillbalance.service';

@Module({
  imports: [PrismaModule],
  controllers: [BalanceController],
  providers: [BalanceService, RefillBalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
