import { Injectable } from '@nestjs/common';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Injectable()
export class ProductReviewService {
  create(createProductReviewDto: CreateProductReviewDto) {
    return 'This action adds a new productReview';
  }

  findAll() {
    return `This action returns all productReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productReview`;
  }

  update(id: number, updateProductReviewDto: UpdateProductReviewDto) {
    return `This action updates a #${id} productReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} productReview`;
  }
}
