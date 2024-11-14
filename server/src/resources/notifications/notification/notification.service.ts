import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { v4 as uuid } from 'uuid';
import { NOTIFICATION_NOT_FOUND_Exception } from 'src/common/exceptions/Notification_not_found.exception';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: { id: uuid(), ...createNotificationDto },
    });
    return notification;
  }

  async findAll() {
    const notifications = await this.prisma.notification.findMany();
    return notifications;
  }

  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (notification) return notification;
    throw new NOTIFICATION_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    await this.findOne(id);
    const Notification = await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
    return Notification;
  }

  async remove(id: string) {
    await this.findOne(id);
    const Notification = await this.prisma.notification.delete({
      where: { id },
    });
    return Notification;
  }
}
