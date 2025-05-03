import { MiniProductCardTypeProps } from '../components/base/minProductCard/interfaces';
import { AddReview, Review } from './review';

export interface createProduct {
  name: string;
  description: string;
  price: number;
  cost_price: number;
  discount: number;
  categoryId: string;
  unitname: string;
  file: File | null;
}

export interface updateProduct {
  name?: string;
  description?: string;
  price?: number;
  cost_price?: number;
  discount?: number;
  categoryId?: string;
  unitname?: string;
  file?: File | null;
}
export interface StoreFilters {
  category?: string;
  search?: string;
  weight?: string;
  Maxprice?: number;
  Minprice?: number;
  page?: number;
  sort?:
    | ''
    | 'price-asc'
    | 'price-desc'
    | 'rating-asc'
    | 'rating-desc'
    | 'name-asc'
    | 'name-desc';
}

export interface ProductDetailsParams {
  ProductId: string;
}
export interface ProductStoreType {
  productPageCount: 0;
  products: ProductCardType[];
}

export interface ProductCardType {
  id: string;
  discount: number;
  name: string;
  categoryName: string;
  description: string;
  productAvgRating: number;
  price: number;
  priceWithDiscount: number;
  unit: string;
  imageLink: string;
  reviewsCount: number;
}

export default interface ProductDetails {
  product: {
    id: string;
    discount: number;
    name: string;
    categoryName: string;
    description: string;
    productAvgRating: number;
    price: number;
    priceWithDiscount: number;
    unit: string;
    imageLink: string;
    categoryId: string;
    reviewsCount: number;
    inStock: boolean;
  };
  reviews: Review[];
  HighlyRighted: ProductCardType[];
  relatedProducts: MiniProductCardTypeProps[];
}

export interface ProductsNewArrivals extends ProductCardType {}

export interface ProductDialogProps extends ProductCardType {
  open: boolean;
  setopen: (open: boolean) => void;
}

export interface ManageProduct {
  id: string;
  name: string;
  price: number;
  costprice: number;
  stock: number;
  description: string;
  productAvgRating: number;
  priceWithDiscount: number;
  categoryName: string;
  unit: string;
  imageLink: string | null;
}

export interface ManageProductsResponse {
  products: ManageProduct[];
  totalProducts: number;
  productspageCount: number;
}

export interface ManageProductsFilters {
  page?: number;
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  min_stock?: number;
  max_stock?: number;
}

export interface SingleProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  cost_price: number;
  discount: number;
  unitname: string;
  categoryId: string;
}

export interface addStockTransaction {
  productId: string;
  transactionType: string;
  quantity: number;
  unitCost?: number;
}

export interface StockTransactionType {
  categoryName: string;
  productName: string;
  imageUrl: string;
  unitName: string;
  quantity: number;
  Type: 'purchase' | 'sale' | 'adjustment';
  date: string; // Assuming date is in string format (ISO or other)
  unitCost: number;
}

export interface StockTransactionResponse {
  pageCount: number;
  stockTransactions: StockTransactionType[];
}

export interface Testimonial {
  id: string;
  rating: number;
  reviewText: string;
  user: {
    email: string;
    name: string;
    avatar: string;
  };
}

export interface ProductStateType {
  productsCard: {
    data: ProductCardType[];
    loading: boolean;
    error: string;
  };
  productsNewArrivals: {
    data: ProductsNewArrivals[];
    loading: boolean;
    error: string;
  };
  productsStore: {
    data: ProductStoreType;
    loading: boolean;
    error: string;
  };
  productsDetails: {
    data: ProductDetails;
    loading: boolean;
    error: string;
  };

  addReview: {
    data: AddReview;
    loading: boolean;
    error: string;
  };
  productsManage: {
    data: ManageProductsResponse;
    loading: boolean;
    error: string;
  };
  manageProductsFilters: {
    filters: ManageProductsFilters;
    openFilters: boolean;
  };

  createProduct: {
    data: createProduct;
    loading: boolean;
    error: string;
  };
  updateProduct: {
    data: updateProduct;
    loading: boolean;
    error: string;
  };
  productById: {
    data: SingleProduct;
    loading: boolean;
    error: string;
  };

  stockTransactions: {
    data: StockTransactionResponse;
    loading: boolean;
    error: string;
  };
  createTransaction: {
    data: addStockTransaction;
    loading: boolean;
    error: string;
  };
  testimonials: {
    data: Testimonial[];
    loading: boolean;
    error: string;
  };
  productToEditId: string;
  isEditProductOpen: boolean;
  isAddProductOpen: boolean;
  isStockTransactionOpen: boolean;
  filters: StoreFilters;
}
