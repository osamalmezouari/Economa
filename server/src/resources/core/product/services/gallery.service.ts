import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { v4 as uuid } from 'uuid';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}
  async StoreProductImage(path: string, productId: string) {
    const existingImage = await this.prisma.gallery.findFirst({
      where: { productId },
    });

    if (existingImage) {
      return this.prisma.gallery.update({
        where: { id: existingImage.id },
        data: { imageUrl: path },
      });
    } else {
      return this.prisma.gallery.create({
        data: {
          id: uuid(),
          productId,
          imageUrl: path,
        },
      });
    }
  }
}
