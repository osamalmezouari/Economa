import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { PlaceOrderDto } from '../dto/placeOrder.dto';
import { CouponService } from 'src/resources/billing/coupon/coupon.service';
import { ShoppingCartService } from 'src/resources/settings/shopping-cart/shopping-cart.service';
import { BalanceService } from 'src/resources/billing/balance/services/balance.service';
import { PaymentService } from 'src/resources/billing/payment/payment.service';
import { endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { OrderItemService } from './order-item.service';

@Injectable()
export class OrdersService {
  totalOrderAmount: number;
  couponId?: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly couponservice: CouponService,
    private readonly shoppingcartservice: ShoppingCartService,
    private readonly balanceService: BalanceService,
    private readonly paymentService: PaymentService,
    private readonly orderItemsService: OrderItemService,
  ) {}

  async PlaceAndPayOrder({ couponCode }: PlaceOrderDto, userId: string) {
    const shoppingCartItemsDetails =
      await this.shoppingcartservice.findShoppingCartByUserId(userId);

    this.totalOrderAmount = shoppingCartItemsDetails.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0,
    );

    let discount_type: 'Percentage' | 'Flat' | undefined;
    let discount_value: number = 0;
    if (couponCode) {
      const {
        discount_type: discountType,
        discount_value: discountValue,
        couponId,
      } = await this.couponservice.verify(
        {
          code: couponCode,
          orderAmountValue: this.totalOrderAmount,
        },
        userId,
      );

      this.couponId = couponId;
      discount_type = discountType;
      discount_value = discountValue;

      if (discount_type === 'Percentage') {
        this.totalOrderAmount *= 1 - discount_value / 100;
      } else if (discount_type === 'Flat') {
        this.totalOrderAmount -= discount_value;
      }

      this.totalOrderAmount = parseFloat(this.totalOrderAmount.toFixed(2));
    }

    const verified = await this.balanceService.verifyBalance({
      userId: userId,
      orderAmount: this.totalOrderAmount,
    });

    if (verified) {
      const order = await this.prisma.order.create({
        data: {
          id: uuid(),
          totalAmount: this.totalOrderAmount || 0,
          userId: userId,
          couponId: this.couponId,
          status: 'paid',
        },
      });

      for (const item of shoppingCartItemsDetails) {
        const originalItemAmount = item.productPrice * item.quantity;
        let discountedUnitPrice = item.productPrice;

        if (couponCode && discount_type) {
          if (discount_type === 'Percentage') {
            discountedUnitPrice *= 1 - discount_value / 100;
          } else if (discount_type === 'Flat') {
            discountedUnitPrice = Math.max(
              0,
              discountedUnitPrice - discount_value / item.quantity,
            );
          }
        }

        discountedUnitPrice = parseFloat(discountedUnitPrice.toFixed(2));

        await this.prisma.orderItem.create({
          data: {
            id: uuid(),
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: discountedUnitPrice,
          },
        });
      }

      await this.paymentService.payOrder({
        orderId: order.id,
        amount: this.totalOrderAmount,
      });

      await this.shoppingcartservice.clearshoopingCart(userId);

      return {
        orderId: order.id,
      };
    }
  }

  async getOrdersStatsData() {
    const endDate = new Date();
    const endDateInMorocco = this.convertToMoroccoTime(endDate);

    const startDate = subMonths(endDate, 1);
    const startDateInMorocco = this.convertToMoroccoTime(startDate);

    const ordersLastMonth = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDateInMorocco,
          lte: endDateInMorocco,
        },
      },
      select: { id: true, createdAt: true },
    });

    const ordersData = ordersLastMonth.reduce(
      (acc, order) => {
        const orderDateInMorocco = this.convertToMoroccoTime(order.createdAt);
        const formattedDate = orderDateInMorocco.toISOString().slice(0, 10);

        if (!acc[formattedDate])
          acc[formattedDate] = { day: formattedDate, orders: 0 };
        acc[formattedDate].orders += 1;

        return acc;
      },
      {} as Record<string, { day: string; orders: number }>,
    );

    const currentMonthOrders = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfMonth(endDate),
          lte: endOfMonth(endDate),
        },
      },
      select: { id: true },
    });

    const totalOrdersMonth = currentMonthOrders.length;

    const previousMonthOrders = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfMonth(subMonths(endDate, 1)),
          lte: endOfMonth(subMonths(endDate, 1)),
        },
      },
      select: { id: true },
    });

    const totalOrdersPreviousMonth = previousMonthOrders.length;

    const percentage =
      totalOrdersPreviousMonth !== 0
        ? ((totalOrdersMonth - totalOrdersPreviousMonth) /
            totalOrdersPreviousMonth) *
          100
        : totalOrdersMonth === 0
          ? 0
          : 100;

    return {
      totalOrdersMonth: totalOrdersMonth,
      ordersData: Object.values(ordersData),
      increased: totalOrdersMonth > totalOrdersPreviousMonth,
      decreased: totalOrdersMonth < totalOrdersPreviousMonth,
      percentage,
    };
  }

  async getOrdersSalesData() {
    const moroccoTimeZone = 'Africa/Casablanca';

    const endDate = this.convertToMoroccoTime(new Date());
    const startDate = subDays(endDate, 7);

    const ordersLastWeek = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gt: startDate,
          lte: endDate,
        },
      },
      select: { id: true, createdAt: true, totalAmount: true },
    });

    const firstDayOfMonth = startOfMonth(endDate);
    const lastDayOfMonth = endOfMonth(endDate);

    const ordersMonth = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
      select: { id: true, createdAt: true, totalAmount: true },
    });

    const firstDayOfPreviousMonth = startOfMonth(subMonths(endDate, 1));
    const lastDayOfPreviousMonth = endOfMonth(subMonths(endDate, 1));

    const ordersPreviousMonth = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: firstDayOfPreviousMonth,
          lte: lastDayOfPreviousMonth,
        },
      },
      select: { id: true, createdAt: true, totalAmount: true },
    });

    const totalOrdersAmountMonth = ordersMonth.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const totalOrdersAmountPreviousMonth = ordersPreviousMonth.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    const percentage =
      totalOrdersAmountPreviousMonth !== 0
        ? ((totalOrdersAmountMonth - totalOrdersAmountPreviousMonth) /
            totalOrdersAmountPreviousMonth) *
          100
        : totalOrdersAmountMonth !== 0
          ? 100
          : 0;

    const ordersData = ordersLastWeek.reduce(
      (acc, order) => {
        const orderDateInMorocco = this.convertToMoroccoTime(order.createdAt);
        const dayFormatted = orderDateInMorocco
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '-');

        if (!acc[dayFormatted]) {
          acc[dayFormatted] = {
            day: dayFormatted,
            totalAmount: 0,
          };
        }

        acc[dayFormatted].totalAmount += order.totalAmount;
        return acc;
      },
      {} as Record<string, { day: string; totalAmount: number }>,
    );

    const ordersDataArray = Object.values(ordersData);

    const increased = totalOrdersAmountMonth > totalOrdersAmountPreviousMonth;
    const decreased = totalOrdersAmountMonth < totalOrdersAmountPreviousMonth;

    return {
      totalOrdersAmountMonth,
      ordersData: ordersDataArray,
      increased,
      decreased,
      percentage,
    };
  }

  async getProfitSalesData() {
    const moroccoTimeZone = 'Africa/Casablanca';

    const endDate = this.convertToMoroccoTime(new Date());
    const startDate = subDays(endDate, 7);

    const orderItemsLastWeek = await this.orderItemsService.getOrderItems(
      startDate,
      endDate,
      true,
      false,
    );

    const firstDayOfMonth = startOfMonth(endDate);
    const lastDayOfMonth = endOfMonth(endDate);

    const orderItemsMonth = await this.orderItemsService.getOrderItems(
      firstDayOfMonth,
      lastDayOfMonth,
      false,
      false,
    );

    const totalProfitMonth = orderItemsMonth.reduce(
      (sum, item) =>
        sum + (item.unitPrice - item.product.cost_price) * item.quantity,
      0,
    );

    const firstDayOfPreviousMonth = startOfMonth(subMonths(endDate, 1));
    const lastDayOfPreviousMonth = endOfMonth(subMonths(endDate, 1));

    const orderItemsPreviousMonth = await this.orderItemsService.getOrderItems(
      firstDayOfPreviousMonth,
      lastDayOfPreviousMonth,
      false,
      false,
    );

    const totalProfitPreviousMonth = orderItemsPreviousMonth.reduce(
      (sum, item) =>
        sum + (item.unitPrice - item.product.cost_price) * item.quantity,
      0,
    );

    const percentage =
      totalProfitPreviousMonth !== 0
        ? ((totalProfitMonth - totalProfitPreviousMonth) /
            totalProfitPreviousMonth) *
          100
        : totalProfitMonth !== 0
          ? 100
          : 0;
    const ordersData = orderItemsLastWeek.reduce(
      (acc, item) => {
        const orderDateInMorocco = this.convertToMoroccoTime(
          item.order.createdAt,
        );
        const dayFormatted = orderDateInMorocco
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '-');

        if (!acc[dayFormatted]) {
          acc[dayFormatted] = {
            day: dayFormatted,
            totalProfit: 0,
          };
        }
        const profit =
          (item.unitPrice - item.product.cost_price) * item.quantity;
        acc[dayFormatted].totalProfit += profit;
        return acc;
      },
      {} as Record<string, { day: string; totalProfit: number }>,
    );

    const ordersDataArray = Object.values(ordersData);
    const increased = totalProfitMonth > totalProfitPreviousMonth;
    const decreased = totalProfitMonth < totalProfitPreviousMonth;

    return {
      totalProfitMonth,
      ordersData: ordersDataArray,
      increased,
      decreased,
      percentage,
    };
  }

  async getYearlySalesXProfit(year?: number) {
    const currentYear = new Date().getFullYear();
    const targetYear = year || currentYear;

    const startDate = new Date(targetYear, 0, 1);
    const endDate = new Date(targetYear, 11, 31, 23, 59, 59);

    const orderItems = await this.orderItemsService.getOrderItems(
      startDate,
      endDate,
      true,
      false,
    );

    const financialData = Array.from({ length: 12 }, (_, month) => ({
      month: month + 1,
      profit: 0,
      sales: 0,
    }));

    orderItems.forEach((item) => {
      const monthIndex = new Date(item.order.createdAt).getMonth();
      const sales = item.unitPrice * item.quantity;
      const profit = (item.unitPrice - item.product.cost_price) * item.quantity;

      financialData[monthIndex].sales += sales;
      financialData[monthIndex].profit += profit;
    });

    return financialData;
  }

  async getLastWeekCostXProfit() {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const orderItems = await this.orderItemsService.getOrderItems(
      sevenDaysAgo,
      today,
      false,
      false,
    );

    const financialData: { date: Date; cost: number; profit: number }[] = [];

    orderItems.forEach((item) => {
      const itemDate = new Date(item.order.createdAt);
      const dateKey = itemDate.toDateString();
      const existingEntry = financialData.find(
        (entry) => entry.date.toDateString() === dateKey,
      );

      const revenue = item.unitPrice * item.quantity;
      const cost = item.product.cost_price * item.quantity;
      const profit = revenue - cost;

      if (existingEntry) {
        existingEntry.cost += cost;
        existingEntry.profit += profit;
      } else {
        financialData.push({ date: itemDate, cost, profit });
      }
    });

    const sortedData = financialData
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => ({
        day: item.date
          .toLocaleString('en-US', { weekday: 'long' })
          .substring(0, 3),
        cost: item.cost,
        profit: item.profit,
      }));

    return sortedData;
  }

  async getSalesProfitCategoryData() {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31, 23, 59, 59);
    const orderItems = await this.orderItemsService.getOrderItems(
      startDate,
      endDate,
      false,
      true,
    );

    const categoryData = new Map<
      string,
      { category: string; sales: number; profit: number }
    >();

    orderItems.forEach((item) => {
      const categoryName = item.product.category.name;
      const sales = item.unitPrice * item.quantity;
      const profit = (item.unitPrice - item.product.cost_price) * item.quantity;

      if (!categoryData.has(categoryName)) {
        categoryData.set(categoryName, {
          category: categoryName,
          sales: 0,
          profit: 0,
        });
      }

      const categoryStat = categoryData.get(categoryName)!;
      categoryStat.sales += sales;
      categoryStat.profit += profit;
    });

    return Array.from(categoryData.values());
  }

  async getTopSellingProducts() {
    const orderItems = await this.prisma.orderItem.findMany({
      select: {
        productId: true,
        unitPrice: true,
        quantity: true,
      },
    });

    const productSalesMap = orderItems.reduce(
      (acc, item) => {
        const { productId, unitPrice, quantity } = item;
        if (!acc[productId]) {
          acc[productId] = { productId, totalSales: 0 };
        }
        acc[productId].totalSales += (unitPrice ?? 0) * (quantity ?? 0);
        return acc;
      },
      {} as Record<string, { productId: string; totalSales: number }>,
    );

    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5);

    return Promise.all(
      topProducts.map(async (product) => {
        const productData = await this.prisma.product.findUnique({
          where: { id: product.productId },
          include: { gallery: true },
        });

        return {
          productId: product.productId,
          productImage: productData?.gallery[0]?.imageUrl || 'No Image',
          productName: productData?.name || 'Unknown',
          totalSales: product.totalSales,
        };
      }),
    );
  }

  async getTopCustomers() {
    const results = await this.prisma.order.groupBy({
      by: ['userId'],
      _sum: {
        totalAmount: true,
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc',
        },
      },
      take: 5,
    });

    return Promise.all(
      results.map(async (item) => {
        const user = await this.prisma.user.findUnique({
          where: { id: item.userId },
        });
        return {
          id: user.id,
          name: user?.name || 'Anonymous',
          email: user.email,
          totalSpent: item._sum.totalAmount ?? 0,
          avatar: user.avatar,
        };
      }),
    );
  }

  async getOrdersByUserId(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      ...order,
      createdAt: this.convertToMoroccoTime(order.createdAt),
    }));
  }

  async getOrderHistory(page: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    const orders = await this.prisma.order.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalOrders = await this.prisma.order.count();
    const totalPages = Math.ceil(totalOrders / pageSize);

    return {
      orders: orders.map((order) => ({
        ...order,
        createdAt: this.convertToMoroccoTime(order.createdAt),
      })),
      pageCount: totalPages,
    };
  }

  private convertToMoroccoTime(date: Date): Date {
    const moroccoTimeZone = 'Africa/Casablanca';
    return toZonedTime(date, moroccoTimeZone); // Use toZonedTime to convert to Morocco time
  }


}
