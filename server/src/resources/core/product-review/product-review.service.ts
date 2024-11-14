import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { v4 as uuid } from 'uuid';
import { REVIEW_NOT_FOUND_Exception } from '../../../common/exceptions/REVIEW_NOT_FOUND.exception';
import { PRODUCT_NOT_FOUND_Exception } from '../../../common/exceptions/PRODUCT_NOT_FOUND.exception';

@Injectable()
export class ProductReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const productReview = await this.prisma.productReview.create({
      data: { id: uuid(), ...createProductReviewDto },
    });
    return productReview;
  }

  async findAll() {
    const productReviews = await this.prisma.productReview.findMany();
    return productReviews;
  }

  async findOne(id: string) {
    const productReview = await this.prisma.productReview.findUnique({
      where: { id },
    });
    if (!productReview) throw new REVIEW_NOT_FOUND_Exception(id);
    return productReview;
  }

  async findByProductId(productId: string) {
    const productReviews = await this.prisma.productReview.findMany({
      where: { productId },
    });
    if (!productReviews.length)
      throw new PRODUCT_NOT_FOUND_Exception(`Product ID: ${productId}`);
    return productReviews;
  }

  async update(id: string, updateProductReviewDto: UpdateProductReviewDto) {
    await this.findOne(id);
    const productReview = await this.prisma.productReview.update({
      where: { id },
      data: updateProductReviewDto,
    });
    return productReview;
  }

  async remove(id: string) {
    await this.findOne(id);
    const productReview = await this.prisma.productReview.delete({
      where: { id },
    });
    return productReview;
  }
}
