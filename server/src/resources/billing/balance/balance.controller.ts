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
import { MakeTransferDto } from './dto/make-transfer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { RefillBalanceService } from './services/refillbalance.service';
import { UsersTransfersService } from './services/userTransfers.service';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly refillBalanceService: RefillBalanceService,
    private readonly usersTransfersService: UsersTransfersService,
  ) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_REFILL_CREATE)
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

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_REFILL_UPDATE)
  @Patch('refillbalancerequest/UpdateStatus/:requestId')
  async UpdateRefillStatus(
    @Param('requestId') requestId: string,
    @Body('status') status: 'approved' | 'rejected',
  ) {
    return this.refillBalanceService.verifyRefillRequest(status, requestId);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_REFILLS_READ)
  @Get('refillbalancerequest')
  async findAllRefills(@Query('page') page: number) {
    return this.refillBalanceService.findAllRefillRequests(page);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_REFILLS_READ)
  @Get('refillbalancerequest/status/:requestId')
  async getRequestStatus(@Param('requestId') requestId: string) {
    return this.refillBalanceService.RefillStatusHistory(requestId);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_REFILL_READ)
  @Get('user/refillbalancerequest')
  async getUserRefills(
    @activeUser('sub') userId: string,
    @Query('page') page: number,
  ) {
    return this.refillBalanceService.UserRefillsRequest(userId, page);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_CARDINFO_READ)
  @Get('CardInfo')
  getCardInfo(@activeUser('sub') userId: string) {
    return this.balanceService.getCardInfo(userId);
  }


  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_TRANSFER_READ)
  @Get('transfers/user')
  getUserTransfers(
    @activeUser('sub') userId: string,
    @Query('page') page: number,
  ) {
    return this.usersTransfersService.getUserTransfer(userId, page || 1);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.BALANCE_TRANSFER)
  @Post('transfers/make')
  makeTransfer(
    @activeUser('sub') userId: string,
    @Body() makeTransferDto: MakeTransferDto,
  ) {
    return this.usersTransfersService.makeTransfer(userId, makeTransferDto);
  }
}
