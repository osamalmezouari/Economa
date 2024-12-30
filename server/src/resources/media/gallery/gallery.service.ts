import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { v4 as uuid } from 'uuid';
import { GALLERY_NOT_FOUND_Exception } from '../../../common/exceptions/GALLERY_NOT_FOUND.exception';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGalleryDto: CreateGalleryDto) {
    const gallery = await this.prisma.gallery.create({
      data: { id: uuid(), ...createGalleryDto },
    });
    return gallery;
  }

  async findAll() {
    const galleries = await this.prisma.gallery.findMany();
    return galleries;
  }

  async findOne(id: string) {
    const gallery = await this.prisma.gallery.findUnique({ where: { id } });
    if (!gallery) throw new GALLERY_NOT_FOUND_Exception(id);
    return gallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    await this.findOne(id);
    const gallery = await this.prisma.gallery.update({
      where: { id },
      data: updateGalleryDto,
    });
    return gallery;
  }

  async remove(id: string) {
    await this.findOne(id);
    const gallery = await this.prisma.gallery.delete({ where: { id } });
    return gallery;
  }
}
