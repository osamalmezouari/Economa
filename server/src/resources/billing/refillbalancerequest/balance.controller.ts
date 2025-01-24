import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RefillbalancerequestService } from './balance.service';
import { Express } from 'express';
import { CreateRefillbalancerequestDto } from './dto/create-refillbalancerequest.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('balance')
export class RefillbalancerequestController {
  constructor(
    private readonly refillbalancerequestService: RefillbalancerequestService,
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
    return this.refillbalancerequestService.create(
      createRefillbalancerequestDto,
      userId,
    );
  }
  @Get('CardInfo')
  getCardInfo(
    @activeUser('sub') userId: string,
  ) {
    return this.refillbalancerequestService.getCardInfo(userId);
  }
  @Get()
  findAll() {
    return this.refillbalancerequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refillbalancerequestService.findOne(+id);
  }
}
