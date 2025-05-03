import { Module } from '@nestjs/common';
import { BalanceService } from './services/balance.service';
import { BalanceController } from './balance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RefillBalanceService } from './services/refillbalance.service';
import { UsersTransfersService } from './services/userTransfers.service';
import { NotificationModule } from 'src/resources/notifications/notification/notification.module';
import { WebsocketsModule } from 'src/common/websockets/websockets.module';

@Module({
  imports: [PrismaModule, NotificationModule, WebsocketsModule],
  controllers: [BalanceController],
  providers: [BalanceService, RefillBalanceService, UsersTransfersService],
  exports: [BalanceService, RefillBalanceService, UsersTransfersService],
})
export class BalanceModule {}
