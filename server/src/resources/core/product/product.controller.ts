import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  
  @AUTH(AuthenticationType.None)
  @Get()
  async findAll() {
    const product = await this.productService.findAll();
    return product;
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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return product;
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);
    return product;
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(id);
    return product;
  }
}
