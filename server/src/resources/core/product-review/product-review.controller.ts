import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Controller('product-reviews')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  async create(@Body() createProductReviewDto: CreateProductReviewDto) {
    const productReview = await this.productReviewService.create(
      createProductReviewDto,
    );
    return productReview;
  }

  @Get()
  async findAll() {
    const productReviews = await this.productReviewService.findAll();
    return productReviews;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productReview = await this.productReviewService.findOne(id);
    return productReview;
  }

  @Get('product/:productId')
  async findByProductId(@Param('productId') productId: string) {
    const productReviews =
      await this.productReviewService.findByProductId(productId);
    return productReviews;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ) {
    const productReview = await this.productReviewService.update(
      id,
      updateProductReviewDto,
    );
    return productReview;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const productReview = await this.productReviewService.remove(id);
    return productReview;
  }
}
