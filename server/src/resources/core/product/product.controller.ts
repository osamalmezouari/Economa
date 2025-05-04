import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './services/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';
import { ParseIdsPipe } from 'src/common/pipes/ParseIdsPipe.pipe';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { ProductReviewService } from './services/product-review.service';
import { ProductStockService } from './services/product-stock.service';
import { ManageProductsTableDto } from './dto/manageProductsTable.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productreviewService: ProductReviewService,
    private readonly productstockService: ProductStockService,
  ) {}

  @AUTH(AuthenticationType.None)
  /*   @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_STORE_READ)
   */
  @Get('store')
  async getStoreProducts(
    @Query('page') page: number,
    @Query('category') category: string,
    @Query('search') search: string,
    @Query('weight') weight: string,
    @Query('Minprice') Minprice: number,
    @Query('Maxprice') Maxprice: number,
    @Query('sort') sort: string,
  ) {
    return this.productService.getStoreProducts({
      page,
      category,
      search,
      weight,
      Minprice,
      Maxprice,
      sort,
    });
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_STOCK_READ)
  @Get('StockTransactions')
  async StockTransaction(@Query('page') page: number) {
    page = page || 1;
    return this.productstockService.getStockTransactions(page);
  }
  @AUTH(AuthenticationType.None)
  /*   @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_CARDS_READ)
   */
  @Get('cards')
  async getAllProductCards() {
    return this.productService.getAllProductCards();
  }

  @AUTH(AuthenticationType.None)
  /*   @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_NEW_ARRIVALS_READ)
   */
  @Get('newArrivals')
  async getnewArrivals() {
    return this.productService.getnewArrivals();
  }

  @AUTH(AuthenticationType.None)
  @Get('reviews')
  async getReviews() {
    const reviews = await this.productreviewService.getReviews();
    return reviews;
  }

  @AUTH(AuthenticationType.None)
  /*   @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_COMPARE_READ)
   */
  @Get('ComparedProductDetails/:ids')
  async getComparedProductDetails(@Param('ids', ParseIdsPipe) ids: string[]) {
    console.log('ids', ids);
    const product = await this.productService.getComparedProductDetails(ids);
    return product;
  }

  @AUTH(AuthenticationType.None)
  /*   @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_DETAILS_READ)
   */
  @Get('productdetails/:id')
  async getProductDetails(@Param('id') id: string) {
    const product = await this.productService.getProductDetails(id);
    return product;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_MANAGE_TABLE_READ)
  @Get('manageProductsTable')
  async getManageProductsTable(@Query() query: ManageProductsTableDto) {
    const products = this.productService.ManageProductsTable(query);
    return products;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_READ)
  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    const product = await this.productService.findOne(productId);
    return product;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_CREATE)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createProductDto.file = file;
    const product = await this.productService.create(createProductDto);
    return product;
  }

  @UseInterceptors(FileInterceptor('file'))
  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_UPDATE)
  @Patch(':productId')
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('productId') productId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateProductDto.file = file;
    }
    const product = await this.productService.update(
      productId,
      updateProductDto,
    );
    return product;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_REVIEW_CREATE)
  @Post('addReview')
  async addProductReview(
    @Body() createProductReviewDto: CreateProductReviewDto,
  ) {
    const review = await this.productreviewService.create(
      createProductReviewDto,
    );
    return review;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PRODUCT_STOCK_CREATE)
  @Post('addStockTransaction')
  async addStockTransaction(
    @Body() createStockTransaction: CreateStockTransactionDto,
  ) {
    const storeStockTransaction =
      await this.productstockService.createStockTransaction(
        createStockTransaction,
      );
    return storeStockTransaction;
  }
}
