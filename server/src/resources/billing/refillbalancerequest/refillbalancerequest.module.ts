import { Module } from '@nestjs/common';
import { RefillbalancerequestService } from './refillbalancerequest.service';
import { RefillbalancerequestController } from './refillbalancerequest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RefillbalancerequestController],
  providers: [RefillbalancerequestService],
})
export class RefillbalancerequestModule {}
