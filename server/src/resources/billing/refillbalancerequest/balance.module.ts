import { Module } from '@nestjs/common';
import { RefillbalancerequestService } from './balance.service';
import { RefillbalancerequestController } from './balance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RefillbalancerequestController],
  providers: [RefillbalancerequestService],
})
export class RefillbalancerequestModule {}
