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
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORY_CREATE)
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

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORIES_READ)
  @Get()
  async findAll(@Query('page') page: number) {
    const categories = await this.categoryService.findAll(page);
    return categories;
  }

  @AUTH(AuthenticationType.None)
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORY_NAMESANDIDS_READ)
  @Get('CategoriesNamesandIds')
  async findCategoriesNamesandIds() {
    const categories = await this.categoryService.CategoriesNamesandIds();
    return categories;
  }


  @AUTH(AuthenticationType.None)
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORY_CARDS_READ)
  @Get('cards')
  async findAllCards() {
    const categories = await this.categoryService.findAllCards();
    return categories;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORY_READ)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return category;
  }

  @AUTH(AuthenticationType.bearer)
  @UseInterceptors(FileInterceptor('file'))
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORY_UPDATE)
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

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.CATEGORY_DELETE)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(id);
    return category;
  }
}
