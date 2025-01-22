import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RefillbalancerequestService } from './refillbalancerequest.service';
import { Express } from 'express';
import { CreateRefillbalancerequestDto } from './dto/create-refillbalancerequest.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('refillbalancerequest')
export class RefillbalancerequestController {
  constructor(
    private readonly refillbalancerequestService: RefillbalancerequestService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    @UploadedFile() file: Express.Multer.File,
    @activeUser('sub') userId: string,
  ) {
    createRefillbalancerequestDto.file = file;
    return this.refillbalancerequestService.create(
      createRefillbalancerequestDto,
      userId,
    );
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
