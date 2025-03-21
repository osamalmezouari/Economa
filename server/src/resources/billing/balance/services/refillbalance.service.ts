import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { CreateRefillbalancerequestDto } from '../dto/create-refillbalancerequest.dto';
import { Unsupported_FILE_Exception } from 'src/common/exceptions/UNSPORTED_FILE.exception';

@Injectable()
export class RefillBalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async refilbalanceRequestcreate(
    createRefillbalancerequestDto: CreateRefillbalancerequestDto,
    userId: string,
  ) {
    try {
      if (!createRefillbalancerequestDto.file) {
        const refillbalancerequest =
          await this.prisma.refillBalanceRequest.create({
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
        return {
          reqStatus: {
            statusCode: 201,
            message: 'Refill balance Registred successfully',
          },
          ...refillbalancerequest,
        };
      }
      const filePath = this.storeFile(
        userId,
        createRefillbalancerequestDto.file,
      );
      const refillbalancerequest =
        await this.prisma.refillBalanceRequest.create({
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
    const documentsRoot = path.join(
      'D:\\Oussama\\PROJECTS\\Economa',
      'Ecommerce_payments_documents',
    );
    const userFolder = path.join(documentsRoot, userId);
    const currentYear = new Date().getFullYear().toString();

    const yearFolder = path.join(userFolder, currentYear);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      throw new Unsupported_FILE_Exception(fileExtension);
    }
    const fileName = `${userId}_${new Date().toISOString().replace(/:/g, '-')}${fileExtension}`;
    const filePath = path.join(yearFolder, fileName);
    try {
      if (!fs.existsSync(yearFolder)) {
        fs.mkdirSync(yearFolder, { recursive: true });
      }
      fs.writeFileSync(filePath, file.buffer);
      return filePath;
    } catch (error) {
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
    const take = 10;
    const skip = (page - 1) * take;

    const refillBalanceRequests =
      await this.prisma.refillBalanceRequest.findMany({
        take,
        skip,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return refillBalanceRequests;
  }
}
