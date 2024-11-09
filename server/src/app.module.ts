import { Module } from '@nestjs/common';
import { IamModule } from './IAM/iam.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './collections/core/product/product.module';
import { ProductReviewModule } from './collections/core/product-review/product-review.module';
import { DiscountTypeModule } from './collections/billing/discount-type/discount-type.module';
import { UserModule } from './collections/core/user/user.module';
import { NotificationModule } from './collections/notifications/notification/notification.module';
import { WishlistModule } from './collections/settings/wishlist/wishlist.module';
import { ShoppingCartModule } from './collections/settings/shopping-cart/shopping-cart.module';
import { RolesModule } from './collections/access/roles/roles.module';
import { OrdersModule } from './collections/core/orders/orders.module';
import { OrderStatusModule } from './collections/core/order-status/order-status.module';
import { OrderItemModule } from './collections/core/order-item/order-item.module';
import { PermissionModule } from './collections/access/permission/permission.module';
import { PaymentModule } from './collections/billing/payment/payment.module';
import { GalleryModule } from './collections/media/gallery/gallery.module';
import { CouponModule } from './collections/billing/coupon/coupon.module';

@Module({
  imports: [
    IamModule,
    PrismaModule,
    ConfigModule.forRoot(),
    ProductModule,
    ProductReviewModule,
    DiscountTypeModule,
    UserModule,
    NotificationModule,
    WishlistModule,
    ShoppingCartModule,
    RolesModule,
    OrdersModule,
    OrderStatusModule,
    OrderItemModule,
    PermissionModule,
    PaymentModule,
    PrismaModule,
    GalleryModule,
    CouponModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
