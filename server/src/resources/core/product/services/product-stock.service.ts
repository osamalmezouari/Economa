import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductReviewService } from './product-review.service';
import { CreateStockTransactionDto } from '../dto/create-stock-transaction.dto';
import { ProductService } from './product.service';

@Injectable()
export class ProductStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productreviewService: ProductReviewService,
    private readonly productService: ProductService,
  ) {}

  async getLowStockProducts(filter: { page: number; productName?: string }) {
    const pageSize = 10;
    const { page, productName } = filter;

    // Get the low stock products
    const lowStockProducts = await this.prisma.product.findMany({
      where: {
        stock: { lt: 50 },
        name: { contains: productName || '' }, // Handling undefined productName
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        Units: true,
        reviews: true,
        gallery: true,
        category: true,
      },
    });

    // Get the total number of low stock products (needed for pagination)
    const totalProductCount = await this.prisma.product.count({
      where: {
        stock: { lt: 50 },
        name: { contains: productName || '' }, // Handle undefined productName
      },
    });

    // Calculate total pages
    const productPageCount = Math.ceil(totalProductCount / pageSize);

    const products = await Promise.all(
      lowStockProducts.map(async (product) => {
        const avgRating = await this.productreviewService.getProductAvgRating(
          product.id,
        );

        return {
          id: product.id,
          name: product.name,
          unit: product.Units.name,
          stock: product.stock,
          costprice: product.price,
          reviews: product.reviews?.length || 0,
          rating: avgRating,
          productImage: product.gallery?.[0]?.imageUrl || '',
          category: product.category.name,
        };
      }),
    );
    return {
      products: products,
      productPageCount,
    };
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

  async createStockTransaction(
    createStockTransaction: CreateStockTransactionDto,
  ) {
    const product = await this.productService.findOne(
      createStockTransaction.productId,
    );
    const storeTransaction = await this.prisma.stockTransaction.create({
      data: {
        productId: createStockTransaction.productId,
        quantity: createStockTransaction.quantity,
        transactionType: createStockTransaction.transactionType,
        unitCost: createStockTransaction.transactionType,
      },
    });
    await this.productService.update(createStockTransaction.productId, {
      stock: product.stock + createStockTransaction.quantity,
    });
    return storeTransaction;
  }
}
