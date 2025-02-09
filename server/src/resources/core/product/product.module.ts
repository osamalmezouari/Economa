import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductReviewService } from './services/product-review.service';
import { ProductStockService } from './services/product-stock.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductReviewService, ProductStockService],
  exports: [ProductStockService],
})
export class ProductModule {}
