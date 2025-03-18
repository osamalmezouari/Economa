import { Injectable, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuid } from 'uuid';
import { CATEGORY_NOT_FOUND_Exception } from '../../../common/exceptions/CATEGORY_NOT_FOUND.exception';
import * as fs from 'fs';
import * as path from 'path';
import { Unsupported_FILE_Exception } from 'src/common/exceptions/UNSPORTED_FILE.exception';
@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const imagepath = this.storeCategoryImage(
      createCategoryDto.name,
      createCategoryDto.file,
    );
    const category = await this.prisma.category.create({
      data: {
        id: uuid(),
        description: createCategoryDto.description,
        name: createCategoryDto.name,
        svgLink: imagepath,
      },
    });
    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async CategoriesNamesandIds() {
    const categories = await this.prisma.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });
    return categories;
  }

  async findAllCards() {
    const categories = await this.prisma.category.findMany({
      include: {
        products: true,
      },
    });
    const categoriesWithProductsCount = await categories.map((item) => {
      return {
        svgLink: item.svgLink,
        name: item.name,
        productsCount: item.products.length,
        id: item.id,
      };
    });
    return categoriesWithProductsCount;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new CATEGORY_NOT_FOUND_Exception(id);
    return category;
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const targetcategory = await this.findOne(categoryId);
    if (updateCategoryDto.file) {
      const imagepath = this.storeCategoryImage(
        targetcategory.name,
        updateCategoryDto.file,
      );
      const category = await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: { ...updateCategoryDto, svgLink: imagepath },
      });
      return category;
    }
    const category = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: { ...updateCategoryDto },
    });
    return category;
  }

  async remove(id: string) {
    await this.findOne(id);
    const category = await this.prisma.category.delete({ where: { id } });
    return category;
  }

  private storeCategoryImage(
    categoryName: string,
    file: Express.Multer.File,
  ): string {
    const documentsRoot = path.join(
      'D:/Oussama/PROJECTS/Economa/client/public/assets/categories',
    );
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      throw new Unsupported_FILE_Exception(fileExtension);
    }
    const fileName = `${categoryName}${fileExtension}`;
    const filePath = path.join(documentsRoot, fileName);
    try {
      if (!fs.existsSync(documentsRoot)) {
        fs.mkdirSync(documentsRoot, { recursive: true });
      }
      const existingFiles = fs
        .readdirSync(documentsRoot)
        .filter((f) => f.startsWith(categoryName));
      if (existingFiles.length > 0) {
        existingFiles.forEach((existingFile) => {
          fs.unlinkSync(path.join(documentsRoot, existingFile));
        });
      }
      fs.writeFileSync(filePath, file.buffer);
      return filePath
        .replace(/\\/g, '/')
        .replace('D:/Oussama/PROJECTS/Economa/client/public', '');
    } catch (error) {
      throw new Error(`Error while storing file: ${error.message}`);
    }
  }
}
