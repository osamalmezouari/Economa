import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { Express } from 'express';
import { CreateRefillbalancerequestDto } from './dto/create-refillbalancerequest.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('refillbalancerequest')
  create(
    @Body() createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    @UploadedFile() file: Express.Multer.File,
    @activeUser('sub') userId: string,
  ) {
    console.log('file', file);
    createRefillbalancerequestDto.file = file;
    return this.balanceService.refilbalanceRequestcreate(
      createRefillbalancerequestDto,
      userId,
    );
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
