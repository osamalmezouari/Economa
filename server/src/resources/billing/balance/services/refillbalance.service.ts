import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { CreateRefillbalancerequestDto } from '../dto/create-refillbalancerequest.dto';
import { BalanceService } from './balance.service';
import { NotificationService } from 'src/resources/notifications/notification/notification.service';
import { EventsService } from 'src/common/websockets/events.service';
import { userInfo } from 'os';

@Injectable()
export class RefillBalanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly BalanceService: BalanceService,
    private readonly notificationService: NotificationService,
    private readonly eventsService: EventsService,
  ) {}

  async getCardInfo(userId: string) {
    const userCardInfo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        balance: true,
      },
    });
    return {
      balance: userCardInfo.balance.Balance,
      name: userCardInfo.name,
    };
  }

  private storeFile(userId: string, file: Express.Multer.File): string {
    const publicFolder = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'public',
      'receipts',
    );
    const userFolder = path.join(publicFolder, userId);
    const currentYear = new Date().getFullYear().toString();
    const yearFolder = path.join(userFolder, currentYear);

    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      throw new Error(`Unsupported file type: ${fileExtension}`);
    }
    const date = Date.now();
    const fileName = `${userId}_${date}${fileExtension}`;
    const filePath = path.join(yearFolder, fileName);

    try {
      // Ensure the directories exist before writing the file
      if (!fs.existsSync(yearFolder)) {
        fs.mkdirSync(yearFolder, { recursive: true });
        console.log('Created directory:', yearFolder);
      }

      // Save the file correctly
      fs.writeFileSync(filePath, file.buffer);
      console.log('File saved at:', filePath);

      // Return the relative URL for HTTP access
      return `/receipts/${userId}/${currentYear}/${fileName}`;
    } catch (error) {
      console.error('Error storing file:', error);
      throw new Error(`Error while storing file: ${error.message}`);
    }
  }
  TotalRefillBalanceRequestsStatCard = async () => {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const currentMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    });

    const prevMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: prevMonthStart,
          lte: prevMonthEnd,
        },
      },
    });
    let percentageChange = 0;
    if (prevMonthCount > 0) {
      percentageChange =
        ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    }

    return {
      title: 'Total Requests',
      metric: currentMonthCount,
      increased: currentMonthCount > prevMonthCount,
      decreased: currentMonthCount < prevMonthCount,
      percentage: Math.trunc(percentageChange),
    };
  };

  TotalPendingRefillBalanceRequestsStatCard = async () => {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const currentMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
        status: 'pending',
      },
    });

    const prevMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: prevMonthStart,
          lte: prevMonthEnd,
        },
        status: 'pending',
      },
    });
    let percentageChange = 0;
    if (prevMonthCount > 0) {
      percentageChange =
        ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    }

    return {
      title: 'Pendding Requests',
      metric: currentMonthCount,
      increased: currentMonthCount > prevMonthCount,
      decreased: currentMonthCount < prevMonthCount,
      percentage: Math.trunc(percentageChange),
    };
  };

  TotalApprovedRefillBalanceRequestsStatCard = async () => {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const currentMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
        status: 'approved',
      },
    });

    const prevMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: prevMonthStart,
          lte: prevMonthEnd,
        },
        status: 'approved',
      },
    });
    let percentageChange = 0;
    if (prevMonthCount > 0) {
      percentageChange =
        ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    }

    return {
      title: 'Approved Requests',
      metric: currentMonthCount,
      increased: currentMonthCount > prevMonthCount,
      decreased: currentMonthCount < prevMonthCount,
      percentage: Math.trunc(percentageChange),
    };
  };

  TotalRejectedRefillBalanceRequestsStatCard = async () => {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const currentMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
        status: 'rejected',
      },
    });

    const prevMonthCount = await this.prisma.refillBalanceRequest.count({
      where: {
        createdAt: {
          gte: prevMonthStart,
          lte: prevMonthEnd,
        },
        status: 'rejected',
      },
    });
    let percentageChange = 0;
    if (prevMonthCount > 0) {
      percentageChange =
        ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    }

    return {
      title: 'Rejected Requests',
      metric: currentMonthCount,
      increased: currentMonthCount > prevMonthCount,
      decreased: currentMonthCount < prevMonthCount,
      percentage: Math.trunc(percentageChange),
    };
  };

  async YearlyrefillReuqtestsChart(year = new Date().getFullYear()) {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const result = [];

    for (let month of months) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);

      const [totalRefillRequests, totalApproved, totalBalanceApproved] =
        await Promise.all([
          this.prisma.refillBalanceRequest.count({
            where: {
              createdAt: {
                gte: start,
                lte: end,
              },
            },
          }),
          this.prisma.refillBalanceRequest.count({
            where: {
              createdAt: {
                gte: start,
                lte: end,
              },
              status: 'approved',
            },
          }),
          this.prisma.refillBalanceRequest
            .aggregate({
              where: {
                createdAt: {
                  gte: start,
                  lte: end,
                },
                status: 'approved',
              },
              _sum: {
                amount: true,
              },
            })
            .then((res) => res._sum.amount || 0),
        ]);

      result.push({
        month: month,
        totalRefillRequests,
        totalApproved,
        totalBalanceApproved,
      });
    }

    // Calculate percentage change for total balance approved compared to the previous year
    const thisYearTotal = result.reduce(
      (sum, data) => sum + data.totalBalanceApproved,
      0,
    );
    const prevYearTotal = await this.prisma.refillBalanceRequest
      .aggregate({
        where: {
          createdAt: {
            gte: new Date(year - 1, 0, 1),
            lte: new Date(year - 1, 11, 31),
          },
          status: 'approved',
        },
        _sum: {
          amount: true,
        },
      })
      .then((res) => res._sum.amount || 0);

    const percentageChange =
      prevYearTotal !== 0
        ? ((thisYearTotal - prevYearTotal) / prevYearTotal) * 100
        : 0;

    return {
      monthlyData: result,
      yearTotal: thisYearTotal,
      prevYearTotal: prevYearTotal,
      percentageChange: percentageChange.toFixed(2),
    };
  }

  async refillRequestDaily(date?: string) {
    let targetDay = new Date();

    // If a date is provided, validate it
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        targetDay = parsedDate;
      }
    }

    targetDay.setHours(0, 0, 0, 0); // Ensure start of the day
    const nextDay = new Date(targetDay);
    nextDay.setDate(targetDay.getDate() + 1); // Move to the next day

    const requests = await this.prisma.refillBalanceRequest.findMany({
      where: {
        createdAt: {
          gte: targetDay,
          lt: nextDay,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    const formattedData = requests.map((request) => ({
      fullname: request.user.name,
      date: request.createdAt.toISOString(),
      amount: request.amount,
      status: request.status,
      avatar: request.user.avatar,
    }));

    const statusCounts = formattedData.reduce(
      (acc, request) => {
        acc[request.status] = (acc[request.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalRefillRequests: formattedData.length,
      totalApproved: statusCounts['approved'] || 0,
      totalRejected: statusCounts['rejected'] || 0,
      totalPending: statusCounts['pending'] || 0,
      data: formattedData,
    };
  }

  async findAllRefillRequests(page: number = 1) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Ensure `skip` is a valid number
    if (isNaN(skip) || skip < 0) {
      throw new Error('Invalid page number');
    }

    const refillsTotal = await this.prisma.refillBalanceRequest.count();

    const refillBalanceRequests =
      await this.prisma.refillBalanceRequest.findMany({
        take: pageSize,
        skip: skip, // Ensure `skip` is always defined
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      });

    return {
      refills: refillBalanceRequests.map((request) => ({
        id: request.id,
        amount: request.amount,
        file: request.file,
        status: request.status,
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString(),
        name: request.user.name,
        email: request.user.email,
        avatar: request.user.avatar,
      })),
      pageCount: Math.ceil(refillsTotal / pageSize),
    };
  }

  async RefillStatusHistory(requestId: string) {
    const refillStatusHistory =
      await this.prisma.refillBalanceRequestStatus.findMany({
        where: {
          requestId: requestId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return refillStatusHistory.map((status) => ({
      status: status.status,
      createdAt: status.createdAt.toISOString(),
    }));
  }

  async verifyRefillRequest(
    status: 'approved' | 'rejected',
    requestId: string,
  ) {
    // Get request data with user information
    const request = await this.prisma.refillBalanceRequest.findUnique({
      where: { id: requestId },
      include: { user: { select: { id: true, name: true } } },
    });

    if (!request) {
      throw new Error('Refill request not found');
    }

    if (status === 'approved') {
      await this.prisma.refillBalanceRequestStatus.create({
        data: {
          id: uuid(),
          status: 'approved', // Fixed: was incorrectly set to 'rejected'
          requestId: requestId,
        },
      });

      const data = await this.prisma.refillBalanceRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: 'approved',
        },
      });
      await this.BalanceService.addAmount(data.userId, data.amount);
      const notification =
        await this.notificationService.createPermissionBasedNotification(
          [{ id: data.userId }],
          `Your balance refill request of $${data.amount} has been approved.`,
          'Balance Refill Approved',
        );

      this.eventsService.sendMessageToAll('new_notification', {
        ...notification,
      });

      return data;
    }
    if (status === 'rejected') {
      await this.prisma.refillBalanceRequestStatus.create({
        data: {
          id: uuid(),
          status: 'rejected',
          requestId: requestId,
        },
      });

      const data = await this.prisma.refillBalanceRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: 'rejected',
        },
      });

      const notification =
        await this.notificationService.createPermissionBasedNotification(
          [{ id: data.userId }],
          `Your balance refill request of $${data.amount} has been Rejected.`,
          'Balance Refill Rejected',
        );

      this.eventsService.sendMessageToAll('new_notification', {
        ...notification,
      });
      return data;
    } else {
      throw new Error('Invalid status');
    }
  }

  async refilbalanceRequestcreate(
    createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    userId: string,
  ) {
    try {
      // Get user information for the notification
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });

      let refillbalancerequest;

      if (!createRefillbalancerequestDto.file) {
        refillbalancerequest = await this.prisma.refillBalanceRequest.create({
          data: {
            id: uuid(),
            amount: createRefillbalancerequestDto.amount,
            status: 'pending',
            userId: userId,
            file: 'no file',
          },
        });
        await this.prisma.refillBalanceRequestStatus.create({
          data: {
            id: uuid(),
            status: 'pending',
            requestId: refillbalancerequest.id,
          },
        });
      } else {
        const filePath = this.storeFile(
          userId,
          createRefillbalancerequestDto.file,
        );
        refillbalancerequest = await this.prisma.refillBalanceRequest.create({
          data: {
            id: uuid(),
            amount: createRefillbalancerequestDto.amount,
            status: 'pending',
            userId: userId,
            file: filePath,
          },
        });

        await this.prisma.refillBalanceRequestStatus.create({
          data: {
            id: uuid(),
            status: 'pending',
            requestId: refillbalancerequest.id,
          },
        });
      }

      const requiredPermissions = ['balance:refill:read'];
      const users_with_required_permissions = await this.prisma.user.findMany({
        where: {
          role: {
            permissions: {
              some: {
                permission: {
                  name: {
                    in: requiredPermissions,
                  },
                },
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      const notification =
        await this.notificationService.createPermissionBasedNotification(
          users_with_required_permissions,
          `${user.email} has requested a balance refill of ${createRefillbalancerequestDto.amount}$`,
          'Refill Request',
        );
      this.eventsService.sendMessageToAll('new_notification', {
        ...notification,
      });

      return {
        reqStatus: {
          statusCode: 201,
          message: 'Refill balance Registred successfully',
        },
        ...refillbalancerequest,
      };
    } catch (error) {
      throw new Error(
        `Error while creating refill balance request: ${error.message}`,
      );
    }
  }

  async UserRefillsRequest(userId: string, page: number = 1) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Ensure `skip` is a valid number
    if (isNaN(skip) || skip < 0) {
      throw new Error('Invalid page number');
    }

    const refillsTotal = await this.prisma.refillBalanceRequest.count({
      where: {
        userId: userId,
      },
    });

    const refillBalanceRequests =
      await this.prisma.refillBalanceRequest.findMany({
        where: {
          userId: userId,
        },
        take: pageSize,
        skip: skip,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      });

    return {
      refills: refillBalanceRequests.map((request) => ({
        id: request.id,
        amount: request.amount,
        file: request.file,
        status: request.status,
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString(),
        name: request.user.name,
        email: request.user.email,
        avatar: request.user.avatar,
      })),
      pageCount: Math.ceil(refillsTotal / pageSize),
    };
  }
}
