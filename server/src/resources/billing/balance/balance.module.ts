import { Module } from '@nestjs/common';
import { BalanceService } from './services/balance.service';
import { BalanceController } from './balance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RefillBalanceService } from './services/refillbalance.service';
import { UsersTransfersService } from './services/userTransfers.service';

@Module({
  imports: [PrismaModule],
  controllers: [BalanceController],
  providers: [BalanceService, RefillBalanceService , UsersTransfersService],
  exports: [BalanceService , RefillBalanceService , UsersTransfersService ],
})
export class BalanceModule {}
