import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { PlaceOrderDto } from './dto/placeOrder.dto';
import { CouponService } from 'src/resources/billing/coupon/coupon.service';
import { ShoppingCartService } from 'src/resources/settings/shopping-cart/shopping-cart.service';
import { BalanceService } from 'src/resources/billing/balance/balance.service';
import { PaymentService } from 'src/resources/billing/payment/payment.service';
import { endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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
  ) {}

  async PlaceAndPayOrder({ couponCode }: PlaceOrderDto, userId: string) {
    const shoppingCartItemsDetails =
      await this.shoppingcartservice.findShoppingCartByUserId(userId);

    // Calculate total amount
    this.totalOrderAmount = shoppingCartItemsDetails.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0,
    );

    // Add tax (20%)
    /*  this.totalOrderAmount = parseFloat((totalOriginalAmount * 1.2).toFixed(2));*/

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
          orderAmountValue: this.totalOrderAmount, // 👈 Use here
        },
        userId,
      ); // Casting to the correct type

      this.couponId = couponId;
      discount_type = discountType;
      discount_value = discountValue;

      if (discount_type === 'Percentage') {
        this.totalOrderAmount *= 1 - discount_value / 100; // Apply % discount
      } else if (discount_type === 'Flat') {
        this.totalOrderAmount -= discount_value; // Apply fixed discount
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

        // Calculate discounted unit price directly per item
        let discountedUnitPrice = item.productPrice;

        if (couponCode && discount_type) {
          // Apply discount to each item individually
          if (discount_type === 'Percentage') {
            discountedUnitPrice *= 1 - discount_value / 100; // Apply % discount to unit price
          } else if (discount_type === 'Flat') {
            // Apply fixed discount to unit price if it applies to each item
            discountedUnitPrice = Math.max(
              0,
              discountedUnitPrice - discount_value / item.quantity,
            );
          }
        }

        discountedUnitPrice = parseFloat(discountedUnitPrice.toFixed(2));

        // Insert order item with discounted unit price
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

      // Process payment
      await this.paymentService.payOrder({
        orderId: order.id,
        amount: this.totalOrderAmount,
      });

      // Clear shopping cart
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
        const formattedDate = orderDateInMorocco.toISOString().slice(0, 10); // Format as YYYY-MM-DD

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

    // Get current and date range for last 7 days
    const endDate = this.convertToMoroccoTime(new Date());
    const startDate = subDays(endDate, 7);

    // Fetch orders within the last 7 days
    const ordersLastWeek = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gt: startDate,
          lte: endDate,
        },
      },
      select: { id: true, createdAt: true, totalAmount: true },
    });

    // Current month range
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

    // Previous month range
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

    // Calculate total amounts
    const totalOrdersAmountMonth = ordersMonth.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const totalOrdersAmountPreviousMonth = ordersPreviousMonth.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    // Calculate percentage
    const percentage =
      totalOrdersAmountPreviousMonth !== 0
        ? ((totalOrdersAmountMonth - totalOrdersAmountPreviousMonth) /
            totalOrdersAmountPreviousMonth) *
          100
        : totalOrdersAmountMonth !== 0
          ? 100
          : 0;

    // Group and format weekly orders
    const ordersData = ordersLastWeek.reduce(
      (acc, order) => {
        const orderDateInMorocco = this.convertToMoroccoTime(order.createdAt);
        const dayFormatted = orderDateInMorocco
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '-'); // year-month-day format

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

    // Get current date and date range for the last 7 days
    const endDate = this.convertToMoroccoTime(new Date());
    const startDate = subDays(endDate, 7);

    // Fetch order items within the last 7 days
    const orderItemsLastWeek = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gt: startDate,
            lte: endDate,
          },
        },
      },
      select: {
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            cost_price: true,
          },
        },
        order: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    // Fetch order items for the current month
    const firstDayOfMonth = startOfMonth(endDate);
    const lastDayOfMonth = endOfMonth(endDate);

    const orderItemsMonth = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      },
      select: {
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            cost_price: true,
          },
        },
      },
    });

    // Calculate total profit for the current month
    const totalProfitMonth = orderItemsMonth.reduce(
      (sum, item) =>
        sum + (item.unitPrice - item.product.cost_price) * item.quantity,
      0,
    );

    // Fetch order items for the previous month
    const firstDayOfPreviousMonth = startOfMonth(subMonths(endDate, 1));
    const lastDayOfPreviousMonth = endOfMonth(subMonths(endDate, 1));

    const orderItemsPreviousMonth = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: firstDayOfPreviousMonth,
            lte: lastDayOfPreviousMonth,
          },
        },
      },
      select: {
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            cost_price: true,
          },
        },
      },
    });

    // Calculate total profit for the previous month
    const totalProfitPreviousMonth = orderItemsPreviousMonth.reduce(
      (sum, item) =>
        sum + (item.unitPrice - item.product.cost_price) * item.quantity,
      0,
    );

    // Calculate the percentage change
    const percentage =
      totalProfitPreviousMonth !== 0
        ? ((totalProfitMonth - totalProfitPreviousMonth) /
            totalProfitPreviousMonth) *
          100
        : totalProfitMonth !== 0
          ? 100
          : 0;

    // Group and format last week's orders data
    const ordersData = orderItemsLastWeek.reduce(
      (acc, item) => {
        const orderDateInMorocco = this.convertToMoroccoTime(
          item.order.createdAt,
        );
        const dayFormatted = orderDateInMorocco
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '-'); // year-month-day format

        if (!acc[dayFormatted]) {
          acc[dayFormatted] = {
            day: dayFormatted,
            totalProfit: 0,
          };
        }

        // Calculate profit for the current item
        const profit =
          (item.unitPrice - item.product.cost_price) * item.quantity;
        acc[dayFormatted].totalProfit += profit;
        return acc;
      },
      {} as Record<string, { day: string; totalProfit: number }>,
    );

    const ordersDataArray = Object.values(ordersData);

    // Determine profit trends
    const increased = totalProfitMonth > totalProfitPreviousMonth;
    const decreased = totalProfitMonth < totalProfitPreviousMonth;

    // Return the final result
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

    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      select: {
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            cost_price: true,
          },
        },
        order: {
          select: {
            createdAt: true,
          },
        },
      },
    });

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

    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
      },
      select: {
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            cost_price: true,
          },
        },
        order: {
          select: {
            createdAt: true,
          },
        },
      },
    });

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
    const startDate = new Date(currentYear, 0, 1); // January 1st
    const endDate = new Date(currentYear, 11, 31, 23, 59, 59); // December 31st

    // Fetch order items with product and category data
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      select: {
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            cost_price: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // Group data by category
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

  /*   async getTopSellingProducts() {
    const results = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        unitPrice: true,
        quantity: true,
      },
      orderBy: {
        _sum: {
          unitPrice: 'desc',
        },
      },
      take: 5,
    });

    return Promise.all(
      results.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          include: {
            gallery: true,
          },
        });
        return {
          productId: product.id,
          productImage: product.gallery[0].imageUrl,
          productName: product?.name || 'Unknown',
          totalSales: (item._sum.unitPrice ?? 0) * (item._sum.quantity ?? 0),
        };
      }),
    );
  } */

  async getTopSellingProducts() {
    // Fetch all order items to aggregate manually
    const orderItems = await this.prisma.orderItem.findMany({
      select: {
        productId: true,
        unitPrice: true,
        quantity: true,
      },
    });

    // Aggregate sales data by productId
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

    // Get the top 5 products by total sales
    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5);

    // Fetch product details for the top products
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

  private convertToMoroccoTime(date: Date): Date {
    const moroccoTimeZone = 'Africa/Casablanca';
    return toZonedTime(date, moroccoTimeZone); // Use toZonedTime to convert to Morocco time
  }

  /*   async create(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { id: uuid(), ...createOrderDto },
    });
    return order;
  }

  async findAll() {
    const order = await this.prisma.order.findMany();
    return order;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (order) return order;
    throw new ORDER_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    const order = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
    return order;
  }

  async remove(id: string) {
    await this.findOne(id);
    const order = await this.prisma.order.delete({ where: { id } });
    return order;
  } */
}
