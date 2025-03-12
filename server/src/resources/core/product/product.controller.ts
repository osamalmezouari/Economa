import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { StoreFiltersDto } from 'src/resources/core/product/dto/storeFilters.dto';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { ProductReviewService } from './services/product-review.service';
import { ProductStockService } from './services/product-stock.service';
import { ManageProductsTableDto } from './dto/manageProductsTable.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productreviewService: ProductReviewService,
    private readonly productstockService: ProductStockService,
  ) {}

  @AUTH(AuthenticationType.None)
  @Get()
  async findAll() {
    const product = await this.productService.findAll();
    return product;
  }

  @AUTH(AuthenticationType.None)
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
    /*     console.log('Page:', page);
    console.log('Category:', category);
    console.log('Search:', search);
    console.log('Weight:', weight);
    console.log('Minprice:', Minprice);
    console.log('Maxprice:', Maxprice);
    console.log('Sort:', sort); */
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
  @Get('StockTransactions')
  async StockTransaction(@Query('page') page: number) {
    page = page || 1;
    return this.productstockService.getStockTransactions(page);
  }
  @AUTH(AuthenticationType.None)
  @Get('cards')
  async getAllProductCards() {
    return this.productService.getAllProductCards();
  }

  @AUTH(AuthenticationType.None)
  @Get('newArrivals')
  async getnewArrivals() {
    return this.productService.getnewArrivals();
  }

  @AUTH(AuthenticationType.None)
  @Get('ComparedProductDetails/:ids')
  async getComparedProductDetails(@Param('ids', ParseIdsPipe) ids: string[]) {
    console.log('ids', ids);
    const product = await this.productService.getComparedProductDetails(ids);
    console.log('Product Details:', product); // Log the data returned from the service
    return product;
  }

  @AUTH(AuthenticationType.None)
  @Get('productdetails/:id')
  async getProductDetails(@Param('id') id: string) {
    const product = await this.productService.getProductDetails(id);
    return product;
  }

  @Get('manageProductsTable')
  async getManageProductsTable(@Query() query: ManageProductsTableDto) {
    const products = this.productService.ManageProductsTable(query);
    console.log('products', products);
    return products;
  }

  @AUTH(AuthenticationType.bearer)
  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    const product = await this.productService.findOne(productId);
    return product;
  }

  @UseInterceptors(FileInterceptor('file'))
  @AUTH(AuthenticationType.bearer)
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
  @Post('addReview')
  async addProductReview(
    @Body() createProductReviewDto: CreateProductReviewDto,
  ) {
    const review = await this.productreviewService.create(
      createProductReviewDto,
    );
    return review;
  }

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
