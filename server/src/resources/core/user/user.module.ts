import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BalanceModule } from 'src/resources/billing/balance/balance.module';

@Module({
  imports: [PrismaModule, BalanceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
