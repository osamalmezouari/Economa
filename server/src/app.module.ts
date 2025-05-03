import { Module } from '@nestjs/common';
import { WebsocketsModule } from './common/websockets/websockets.module';
import { IamModule } from './IAM/iam.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './resources/core/product/product.module';
import { UserModule } from './resources/core/user/user.module';
import { NotificationModule } from './resources/notifications/notification/notification.module';
import { WishlistModule } from './resources/settings/wishlist/wishlist.module';
import { ShoppingCartModule } from './resources/settings/shopping-cart/shopping-cart.module';
import { RolesModule } from './resources/access/roles/roles.module';
import { OrdersModule } from './resources/core/orders/orders.module';
import { PermissionModule } from './resources/access/permission/permission.module';
import { PaymentModule } from './resources/billing/payment/payment.module';
import { CouponModule } from './resources/billing/coupon/coupon.module';
import { CategoryModule } from './resources/core/category/category.module';
import { BalanceModule } from './resources/billing/balance/balance.module';
import { AnalyticsModule } from './resources/core/analytics/analytics.module';


@Module({
  imports: [
    IamModule,
    PrismaModule,
    ConfigModule.forRoot(),
    ProductModule,
    UserModule,
    NotificationModule,
    WishlistModule,
    ShoppingCartModule,
    RolesModule,
    OrdersModule,
    PermissionModule,
    PaymentModule,
    PrismaModule,
    CouponModule,
    CategoryModule,
    BalanceModule,
    AnalyticsModule,
  WebsocketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
