import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { sub } from 'date-fns';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  @SET_PERMESSIONS(Permissions_TYPE.NOTIFICATION_READ)
  @Get('user/list')
  async getNotificationList(@activeUser('sub') userId : string) {
    const notifications = await this.notificationService.getNotificationList(userId);
    return notifications;
  }

  @SET_PERMESSIONS(Permissions_TYPE.NOTIFICATION_UPDATE)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    const notification = await this.notificationService.update(
      id,
      updateNotificationDto,
    );
    return notification;
  }
}
