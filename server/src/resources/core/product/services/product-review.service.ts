import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductReviewDto } from '../dto/update-product-review.dto';
import { v4 as uuid } from 'uuid';
import { REVIEW_NOT_FOUND_Exception } from '../../../../common/exceptions/REVIEW_NOT_FOUND.exception';
import { PRODUCT_NOT_FOUND_Exception } from '../../../../common/exceptions/PRODUCT_NOT_FOUND.exception';
import { USER_NOT_FOUND_Exception } from 'src/common/exceptions/User_not_found.exception';
import { REVIEW_EXISST_Exception } from 'src/common/exceptions/REVIEW_EXISST.exception';
import { CreateProductReviewDto } from '../dto/create-product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const User = await this.prisma.user.findUnique({
      where: {
        email: createProductReviewDto.email,
      },
    });
    if (!User) {
      throw new USER_NOT_FOUND_Exception('');
    }
    const Check_exissting_review_for_user =
      await this.prisma.productReview.findMany({
        where: {
          userId: User.id,
          productId: createProductReviewDto.productId,
        },
      });
    if (Check_exissting_review_for_user.length) {
      throw new REVIEW_EXISST_Exception();
    }
    const productReview = await this.prisma.productReview.create({
      data: {
        id: uuid(),
        rating: createProductReviewDto.rating,
        reviewText: createProductReviewDto.reviewText,
        productId: createProductReviewDto.productId,
        userId: User.id,
      },
    });
    return productReview;
  }

  async getProductAvgRating(productId: string): Promise<number> {
    const result = await this.prisma.productReview.aggregate({
      where: { productId },
      _avg: { rating: true },
    });

    if (result._avg?.rating === null || result._avg?.rating === undefined) {
      return 0;
    }
    return result._avg.rating;
  }

  /*   async findAll() {
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
  } */
}
