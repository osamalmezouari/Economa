import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createCategoryDto.file = file;
    const category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  @Get()
  async findAll(@Query('page') page: number) {
    const categories = await this.categoryService.findAll(page);
    return categories;
  }

  @Get('CategoriesNamesandIds')
  async findCategoriesNamesandIds() {
    const categories = await this.categoryService.CategoriesNamesandIds();
    return categories;
  }

  @AUTH(AuthenticationType.None)
  @Get('cards')
  async findAllCards() {
    const categories = await this.categoryService.findAllCards();
    return categories;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return category;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateCategoryDto.file = file;
    }
    const category = await this.categoryService.update(id, updateCategoryDto);
    return category;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(id);
    return category;
  }
}
