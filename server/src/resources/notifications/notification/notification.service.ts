import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { v4 as uuid } from 'uuid';
import { NOTIFICATION_NOT_FOUND_Exception } from 'src/common/exceptions/Notification_not_found.exception';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (notification) return notification;
    throw new NOTIFICATION_NOT_FOUND_Exception(id);
  }

  async findAll() {
    const notifications = await this.prisma.notification.findMany();
    return notifications;
  }

  async getNotificationList(userId: string) {
    const userNotifications = await this.prisma.userNotification.findMany({
      where: { userId },
      include: { notification: true },
      orderBy: {
        notification: {
          createdAt: 'desc',
        },
      },
    });

    return userNotifications.map((userNotif) => ({
      id: userNotif.notification.id,
      userId: userNotif.userId,
      type: userNotif.notification.type,
      message: userNotif.notification.message,
      isRead: userNotif.notification.isRead, // from userNotification table
      createdAt: userNotif.notification.createdAt.toISOString(),
    }));
  }

  async createPermissionBasedNotification(
    users: { id: string }[],
    message: string,
    type: string,
  ) {
    if (users.length === 0) return;
    const notification = await this.prisma.notification.create({
      data: {
        id: uuid(),
        message,
        type,
        isRead: false,
      },
    });
    const notificationLinks = users.map((user) => ({
      userId: user.id,
      notificationId: notification.id,
    }));

    await this.prisma.userNotification.createMany({
      data: notificationLinks,
    });

    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    await this.findOne(id);
    const Notification = await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
    return Notification;
  }
}
