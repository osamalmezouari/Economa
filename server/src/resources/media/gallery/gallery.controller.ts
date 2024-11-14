import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  async create(@Body() createGalleryDto: CreateGalleryDto) {
    const gallery = await this.galleryService.create(createGalleryDto);
    return gallery;
  }

  @Get()
  async findAll() {
    const galleries = await this.galleryService.findAll();
    return galleries;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const gallery = await this.galleryService.findOne(id);
    return gallery;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    const gallery = await this.galleryService.update(id, updateGalleryDto);
    return gallery;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const gallery = await this.galleryService.remove(id);
    return gallery;
  }
}
