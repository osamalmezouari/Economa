import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PRODUCT_NOT_FOUND_Exception } from 'src/common/exceptions/PRODUCT_NOT_FOUND.exception';
import { StoreFiltersDto } from 'src/resources/core/product/dto/storeFilters.dto';
import { ProductReviewService } from './product-review.service';
import { ManageProductsTableDto } from '../dto/manageProductsTable.dto';
import { Unsupported_FILE_Exception } from 'src/common/exceptions/UNSPORTED_FILE.exception';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { GalleryService } from 'src/resources/media/gallery/gallery.service';
@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reviewService: ProductReviewService,
    private readonly galleryService: GalleryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    // Find the product category by its ID
    const productCategoryname = await this.prisma.category.findUnique({
      where: {
        id: createProductDto.categoryId,
      },
      select: {
        name: true,
      },
    });

    // Check if the unit already exists
    const findProductUnit = await this.prisma.units.findFirst({
      where: {
        name: createProductDto.unitname,
      },
    });

    let unitId: string;

    // If the unit exists, use the existing unitId
    if (findProductUnit) {
      unitId = findProductUnit.id;
    } else {
      // If the unit doesn't exist, create a new unit and get the unitId
      const newUnit = await this.prisma.units.create({
        data: {
          id: uuid(),
          name: createProductDto.unitname,
        },
      });
      unitId = newUnit.id;
    }

    const unitname = await this.prisma.units
      .findFirst({
        where: {
          id: unitId,
        },
        select: {
          name: true,
        },
      })
      .then((data) => data.name);

    // Now you can use the unitId to create a new product or do further logic
    const product = await this.prisma.product.create({
      data: {
        id: uuid(),
        categoryId: createProductDto.categoryId,
        unitId,
        name: createProductDto.name,
        description: createProductDto.description,
        discount: createProductDto.discount,
        price: createProductDto.price,
        cost_price: createProductDto.cost_price,
        stock: 0,
      },
    });
    const path = this.storeProductImage(
      product.id,
      createProductDto.file,
      `${productCategoryname.name}`,
    );
    await this.galleryService.StoreProductImage(path, product.id);
    return product;
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    // Find the existing product
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { Units: true, category: true },
    });

    // Find the product category by its ID
    const productCategoryname = await this.prisma.category.findUnique({
      where: { id: updateProductDto.categoryId },
      select: { name: true },
    });

    // Check if the unit exists or create a new one
    let unitId = existingProduct.unitId;
    if (updateProductDto.unitname !== existingProduct.Units.name) {
      const existingUnit = await this.prisma.units.findFirst({
        where: { name: updateProductDto.unitname },
      });

      if (existingUnit) {
        unitId = existingUnit.id;
      } else {
        const newUnit = await this.prisma.units.create({
          data: { id: uuid(), name: updateProductDto.unitname },
        });
        unitId = newUnit.id;
      }
    }

    // Update product details
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        categoryId: updateProductDto.categoryId,
        unitId,
        name: updateProductDto.name,
        description: updateProductDto.description,
        discount: updateProductDto.discount,
        price: updateProductDto.price,
        cost_price: updateProductDto.cost_price,
      },
    });

    // Handle file update if a new file is provided
    if (updateProductDto.file) {
      const unitname = await this.prisma.units.findFirst({
        where: { id: unitId },
        select: { name: true },
      });

      const imagePath = this.storeProductImage(
        updatedProduct.id,
        updateProductDto.file,
        `${productCategoryname.name}`,
      );

      await this.galleryService.StoreProductImage(imagePath, updatedProduct.id);
    }

    return updatedProduct;
  }

  async findAll() {
    const product = await this.prisma.product.findMany();
    return product;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        Units: {
          select: {
            name: true,
          
          },
        },
        category: {
          select: {
            id: true,
          },
        },
      },
    });
    if (product)
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        cost_price: product.cost_price,
        discount: product.discount,
        unitname: product.Units.name,
        categoryId: product.category.id,
        stock : product.stock
      };

    if (!product) throw new PRODUCT_NOT_FOUND_Exception(id);
  }

  async getAllProductCards() {
    const productsWithDiscount = await this.prisma.product.findMany({
      where: {
        discount: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discount: true,
        gallery: {
          select: {
            imageUrl: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        Units: {
          select: {
            name: true,
          },
        },
      },
    });

    const productsWithAvgRating = productsWithDiscount.map((product) => {
      /* const totalRating = product.reviews.reduce((total, review) => {
        return total + (review.rating || 0);
      }, 0);
      const avgRating = totalRating / product.reviews.length;
      const cappedAvgRating = Math.min(avgRating, 5); */
      const cappedAvgRating = this.reviewService.getProductAvgRating(
        product.id,
      );

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        productAvgRating: cappedAvgRating || 0,
        priceWithDiscount: parseFloat(
          (product.price - (product.price * product.discount) / 100).toFixed(2),
        ),
        categoryName: product.category.name,
        unit: product.Units.name,
        imageLink: product.gallery[0].imageUrl,
      };
    });

    return productsWithAvgRating;
  }

  async getnewArrivals() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);
    const productsWithDiscount = await this.prisma.product.findMany({
      where: {
        created_at: {
          gt: oneMonthAgo,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discount: true,
        gallery: {
          select: {
            imageUrl: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        Units: {
          select: {
            name: true,
          },
        },
      },
    });

    const productsWithAvgRating = productsWithDiscount.map((product) => {
      /* const totalRating = product.reviews.reduce((total, review) => {
        return total + (review.rating || 0);
      }, 0);
      const avgRating = totalRating / product.reviews.length;
      const cappedAvgRating = Math.min(avgRating, 5); */

      const cappedAvgRating = this.reviewService.getProductAvgRating(
        product.id,
      );

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        productAvgRating: cappedAvgRating || 0,
        priceWithDiscount: parseFloat(
          (product.price - (product.price * product.discount) / 100).toFixed(2),
        ),
        categoryName: product.category.name,
        unit: product.Units.name,
        imageLink: product.gallery[0].imageUrl,
      };
    });

    return productsWithAvgRating;
  }

  async getComparedProductDetails(ids: string[]) {
    const validateIds = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (validateIds.length !== ids.length) {
      throw new Error('Invalid Ids');
    }

    const products = await Promise.all(
      validateIds.map(async (product) => {
        const productData = await this.prisma.product.findUnique({
          where: {
            id: product.id,
          },
          select: {
            id: true,
            name: true,
            price: true,
            discount: true,
            description: true,
            stock: true,
            gallery: {
              select: {
                imageUrl: true,
              },
            },
            Units: {
              select: {
                name: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        });
        const cappedAvgRating = this.reviewService.getProductAvgRating(
          product.id,
        );

        return {
          id: productData.id,
          svgLink: productData.gallery?.[0]?.imageUrl || '',
          productName: productData.name,
          productId: productData.id,
          categoryName: productData.category?.name || 'Uncategorized',
          rating: cappedAvgRating,
          reviewsCount: productData.reviews?.length || 0,
          price: productData.price,
          weight: productData.Units?.name || 'N/A',
          description: productData.description,
          stock: productData.stock,
        };
      }),
    );

    return products;
  }

  async getStoreProducts(filters: StoreFiltersDto) {
    const filterConditions: any = {};
    let orderBy: any = {};
    switch (filters.sort) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'name-asc':
        orderBy = { name: 'asc' };
        break;
      case 'name-desc':
        orderBy = { name: 'desc' };
        break;
      default:
        orderBy = {};
    }

    if (filters.search) {
      filterConditions.name = {
        contains: filters.search,
      };
      filterConditions.description = {
        contains: filters.search,
      };
    }
    if (filters.category) {
      filterConditions.category = {
        name: filters.category,
      };
    }
    if (filters.weight) {
      filterConditions.weight = filters.weight;
    }
    if (filters.Minprice) {
      filterConditions.price = {
        gte: filters.Minprice,
      };
    }

    if (filters.Maxprice) {
      if (!filterConditions.price) filterConditions.price = {};
      filterConditions.price.lte = filters.Maxprice;
    }
    const products = await this.prisma.product.findMany({
      skip: filters.page ? (filters.page - 1) * 6 : 0,
      take: filters.page ? 6 : undefined,
      orderBy: orderBy,
      where: {
        ...filterConditions,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discount: true,
        gallery: {
          select: {
            imageUrl: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        Units: {
          select: {
            name: true,
          },
        },
      },
    });

    const productPageCount = await this.prisma.product
      .count({
        where: filterConditions,
      })
      .then((count) => Math.ceil(count / 6));
    const productsWithAvgRating = products.map((product) => {
      const totalRating = product.reviews.reduce((total, review) => {
        return total + (review.rating || 0);
      }, 0);
      const avgRating = totalRating / product.reviews.length;
      const cappedAvgRating = Math.min(avgRating, 5);

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        description: product.description,
        productAvgRating: cappedAvgRating || 0,
        priceWithDiscount: parseFloat(
          (product.price - (product.price * product.discount) / 100).toFixed(2),
        ),
        categoryName: product.category.name,
        unit: product.Units.name,
        imageLink: product.gallery[0].imageUrl,
      };
    });
    if (filters.sort === 'rating-asc' || filters.sort === 'rating-desc') {
      productsWithAvgRating.sort((a, b) =>
        filters.sort === 'rating-asc'
          ? a.productAvgRating - b.productAvgRating
          : b.productAvgRating - a.productAvgRating,
      );
    }

    return {
      productPageCount,
      products: productsWithAvgRating,
    };
  }

  async getProductDetails(productId: string) {
    this.findOne(productId);
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discount: true,
        stock: true,
        gallery: {
          select: {
            imageUrl: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        Units: {
          select: {
            name: true,
          },
        },
      },
    });

    const cappedAvgRating = this.reviewService.getProductAvgRating(productId);

    const productWithAvgRating = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      description: product.description,
      productAvgRating: cappedAvgRating || 0,
      priceWithDiscount: parseFloat(
        (product.price - (product.price * product.discount) / 100).toFixed(2),
      ),
      categoryName: product.category.name,
      unit: product.Units.name,
      imageLink: product.gallery[0]?.imageUrl || '',
      reviewsCount: product.reviews.length,
      inStock: product.stock > 0,
    };
    const productDetails = {
      product: {
        ...productWithAvgRating,
      },
      reviews: product.reviews,
      relatedProducts: await this.getStoreProducts({
        category: product.category.name,
        sort: '',
        page: 0,
        search: '',
        weight: '',
        Minprice: 0,
        Maxprice: 0,
      }).then((data) => {
        const WithoutRequestedProduct = data.products.filter(
          (p) => p.id !== productId,
        );
        return [
          ...WithoutRequestedProduct.map((product) => {
            return {
              productId: product.id,
              name: product.name,
              svgLink: product.imageLink,
              price: product.price,
              priceWithDiscount: product.priceWithDiscount,
              productAvgRating: product.productAvgRating,
            };
          }),
        ];
      }),
      HighlyRighted: await this.getStoreProducts({
        category: '',
        sort: 'rating-desc',
        page: 0,
        search: '',
        weight: '',
        Minprice: 0,
        Maxprice: 0,
      }).then((data) => {
        return data.products.filter(
          (product) =>
            product.productAvgRating >= 3 && product.id !== productId,
        );
      }),
    };
    return productDetails;
  }

  ManageProductsTable = async ({
    page = 1,
    search = '',
    category,
    min_price,
    max_price,
    min_stock,
    max_stock,
  }: ManageProductsTableDto) => {
    const itemsPerPage = 10;
    search = search.replace(/%20/g, ' ');
    const filters: any = {
      name: {
        contains: search,
      },
    };

    if (category && category !== '') {
      // Only add the category filter if it's a valid string
      filters.category = {
        name: category,
      };
    }

    if (min_price !== undefined || max_price !== undefined) {
      filters.price = {};
      if (min_price !== undefined) filters.price.gte = min_price;
      if (max_price !== undefined) filters.price.lte = max_price;
    }

    if (min_stock !== undefined || max_stock !== undefined) {
      filters.stock = {};
      if (min_stock === undefined || min_stock === 0) {
        filters.stock.gte = 0;
      } else {
        filters.stock.gte = min_stock;
      }
      if (max_stock !== undefined) filters.stock.lte = max_stock;
    }

    const totalProducts = await this.prisma.product.count({
      where: filters,
    });
    page = Math.max(1, page);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const products = await this.prisma.product.findMany({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      where: filters,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        Units: {
          select: {
            name: true,
          },
        },
        gallery: {
          select: {
            imageUrl: true,
          },
        },
      },
    });

    const productsWithAvgRating = await Promise.all(
      products.map(async (product) => {
        const cappedAvgRating = await this.reviewService.getProductAvgRating(
          product.id,
        );
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          productAvgRating: cappedAvgRating || 0,
          costprice: product.cost_price,
          stock: product.stock,
          priceWithDiscount: parseFloat(
            (product.price - (product.price * product.discount) / 100).toFixed(
              2,
            ),
          ),
          categoryName: product.category.name,
          unit: product.Units.name,
          imageLink: product.gallery[0]?.imageUrl || null,
        };
      }),
    );

    return {
      products: productsWithAvgRating,
      totalProducts,
      productspageCount: totalPages,
    };
  };

  private storeProductImage(
    productId: string,
    file: Express.Multer.File,
    storepath: string,
  ): string {
    const documentsRoot = path.join(
      'D:/Oussama/PROJECTS/Economa/client/public/assets/products',
      storepath,
    );
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (!['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      throw new Unsupported_FILE_Exception(fileExtension);
    }

    const fileName = `${productId}${fileExtension}`;
    const filePath = path.join(documentsRoot, fileName);

    try {
      // Ensure the directory exists
      if (!fs.existsSync(documentsRoot)) {
        fs.mkdirSync(documentsRoot, { recursive: true });
      }

      // Check if an existing image for the product exists
      const existingFiles = fs
        .readdirSync(documentsRoot)
        .filter((f) => f.startsWith(productId));

      if (existingFiles.length > 0) {
        // Delete existing files before writing a new one (handles update case)
        existingFiles.forEach((existingFile) => {
          fs.unlinkSync(path.join(documentsRoot, existingFile));
        });
      }

      // Write the new file
      fs.writeFileSync(filePath, file.buffer);

      // Return the stored image path (relative to public folder)
      return filePath
        .replace(/\\/g, '/')
        .replace('D:/Oussama/PROJECTS/Economa/client/public', '');
    } catch (error) {
      throw new Error(`Error while storing file: ${error.message}`);
    }
  }
}
