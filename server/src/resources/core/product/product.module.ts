import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductReviewService } from '../product-review/product-review.service';
import { ProductReviewModule } from '../product-review/product-review.module';

@Module({
  imports: [PrismaModule, ProductReviewModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
