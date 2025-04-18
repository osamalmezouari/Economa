import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  Patch,
} from '@nestjs/common';
import { BalanceService } from './services/balance.service';
import { Express } from 'express';
import { CreateRefillbalancerequestDto } from './dto/create-refillbalancerequest.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { RefillBalanceService } from './services/refillbalance.service';

@Controller('balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly refillBalanceService: RefillBalanceService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('refillbalancerequest')
  create(
    @Body() createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    @UploadedFile() file: Express.Multer.File,
    @activeUser('sub') userId: string,
  ) {
    console.log('file', file);
    createRefillbalancerequestDto.file = file;
    return this.refillBalanceService.refilbalanceRequestcreate(
      createRefillbalancerequestDto,
      userId,
    );
  }

  @Patch('refillbalancerequest/UpdateStatus/:requestId')
  async UpdateRefillStatus(
    @Param('requestId') requestId: string,
    @Body('status') status: 'approved' | 'rejected',
  ) {
    return this.refillBalanceService.verifyRefillRequest(status, requestId);
  }

  @Get('refillbalancerequest')
  async findAllRefills(@Query('page') page: number) {
    return this.refillBalanceService.findAllRefillRequests(page);
  }

  @Get('refillbalancerequest/status/:requestId')
  async getRequestStatus(@Param('requestId') requestId: string) {
    return this.refillBalanceService.RefillStatusHistory(requestId);
  }

  @Get('CardInfo')
  getCardInfo(@activeUser('sub') userId: string) {
    return this.balanceService.getCardInfo(userId);
  }
  @Get()
  findAll() {
    return this.balanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceService.findOne(+id);
  }
}
