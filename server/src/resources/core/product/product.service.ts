import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { PRODUCT_NOT_FOUND_Exception } from 'src/common/exceptions/PRODUCT_NOT_FOUND.exception';
import { StoreFiltersDto } from 'src/common/dto/storeFilters.dto';
import { contains } from 'class-validator';
import { ProductReviewService } from '../product-review/product-review.service';
import { CreateProductReviewDto } from '../product-review/dto/create-product-review.dto';
@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reviewService: ProductReviewService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        id: uuid(),
        ...createProductDto,
      },
    });
    return product;
  }

  async findAll() {
    const product = await this.prisma.product.findMany();
    return product;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (product) return product;
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
      const totalRating = product.reviews.reduce((total, review) => {
        return total + (review.rating || 0);
      }, 0);
      const avgRating = totalRating / product.reviews.length;
      const cappedAvgRating = Math.min(avgRating, 5);

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
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);
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
      const totalRating = product.reviews.reduce((total, review) => {
        return total + (review.rating || 0);
      }, 0);
      const avgRating = totalRating / product.reviews.length;
      const cappedAvgRating = Math.min(avgRating, 5);

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

        return {
          id: productData.id,
          svgLink: productData.gallery?.[0]?.imageUrl || '',
          productName: productData.name,
          productId: productData.id,
          categoryName: productData.category?.name || 'Uncategorized',
          rating: productData.reviews?.[0]?.rating || 0,
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
      /*       case 'rating-asc':
        orderBy = { reviews: { rating: 'asc' } };
        break;
      case 'rating-desc':
        orderBy = { reviews: { rating: 'desc' } };
        break; */
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

    const totalRating = product.reviews.reduce((total, review) => {
      return total + (review.rating || 0);
    }, 0);
    const avgRating = totalRating / product.reviews.length;
    const cappedAvgRating = Math.min(avgRating, 5);

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

  async addProductReview(ProductReview: CreateProductReviewDto) {
    const review = await this.reviewService.create({
      name: ProductReview.name,
      email: ProductReview.email,
      productId: ProductReview.productId,
      rating: ProductReview.rating,
      reviewText: ProductReview.reviewText,
    });
    return review;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return product;
  }

  async remove(id: string) {
    await this.findOne(id);
    const product = await this.prisma.product.delete({ where: { id } });
    return product;
  }
}
