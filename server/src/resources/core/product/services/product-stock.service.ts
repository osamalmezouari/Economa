import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductReviewService } from './product-review.service';

@Injectable()
export class ProductStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productreviewService: ProductReviewService,
  ) {}

  async getLowStockProducts(filter: { page: number; productName?: string }) {
    const pageSize = 10;
    const { page, productName } = filter;

    const lowStockProducts = await this.prisma.product.findMany({
      where: {
        stock: { lt: 50 },
        name: { contains: productName },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,

      include: {
        Units: true,
        reviews: true,
        gallery: true,
      },
    });

    return lowStockProducts.map((product) => {
      const avgRating = this.productreviewService.getProductAvgRating(
        product.id,
      );
      return {
        id: product.id,
        name: product.name,
        unit: product.Units.name,
        stock: product.stock,
        price: product.price,
        rating: product.reviews.length,
        avgRating: avgRating,
        discount: product.discount ?? 0,
        productImage: product.gallery[0].imageUrl,
        productPageCount: pageSize,
      };
    });
  }
  async findStockForProduct(productId: string) {
    const result = await this.prisma.stockTransaction.groupBy({
      by: ['transactionType'],
      _sum: { quantity: true },
      where: { productId },
    });
    let currentStock = 0;
    for (const entry of result) {
      const quantity = entry._sum.quantity ?? 0;
      switch (entry.transactionType) {
        case 'purchase':
        case 'return':
        case 'adjustment':
          currentStock += quantity;
          break;
        case 'sale':
          currentStock -= quantity;
          break;
      }
    }
    return currentStock;
  }
}
