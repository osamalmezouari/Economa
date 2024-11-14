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

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationService.create(
      createNotificationDto,
    );
    return notification;
  }

  @Get()
  async findAll() {
    const notifications = await this.notificationService.findAll();
    return notifications;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const notification = await this.notificationService.findOne(id);
    return notification;
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const notification = await this.notificationService.remove(id);
    return notification;
  }
}
