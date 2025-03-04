import ProductDetails, {
  createProduct,
  ManageProductsFilters,
  ManageProductsResponse,
  ProductCardType,
  ProductsNewArrivals,
  ProductStoreType,
  StoreFilters,
  updateProduct,
} from '../types/product';
import { apiClient } from '../utils/apiClient';

export const getProductsStore = async (
  filters: StoreFilters
): Promise<ProductStoreType> => {
  try {
    const filtersQuery = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    const response = await apiClient.get<ProductStoreType>(
      `products/store?${filtersQuery ? `${filtersQuery}` : ''}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.string;
    }
    throw new Error('Failed to Fetch products');
  }
};

export const getProductsCards = async (): Promise<ProductCardType[]> => {
  try {
    const response = await apiClient.get<ProductCardType[]>('products/cards');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.string;
    }
    throw new Error('Failed to Fetch products Cards');
  }
};

export const getProductsNewArrivals = async (): Promise<
  ProductsNewArrivals[]
> => {
  try {
    const response = await apiClient.get<ProductsNewArrivals[]>(
      'products/newArrivals'
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.string;
    }
    throw new Error('Failed to Fetch products New Arrivals');
  }
};

export const getProductsDetails = async (
  id: string
): Promise<ProductDetails> => {
  try {
    const response = await apiClient.get<ProductDetails>(
      `products/productdetails/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.string;
    }
    throw new Error('Failed to Fetch product details');
  }
};

export const getManageProductsTable = async (
  filters: ManageProductsFilters
): Promise<ManageProductsResponse> => {
  try {
    const response = await apiClient.get<ManageProductsResponse>(
      `products/manageproductstable?page=${filters.page ?? 1}&category=${filters.category ?? ''}&search=${filters.search ?? ''}&min_price=${filters.min_price ?? 1}&max_price=${filters.max_price ?? 50}&min_stock=${filters.min_stock ?? 1}&max_stock=${filters.max_stock ?? 50}`
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error('Failed to fetch products table');
  }
};

export const CreateProduct = async (
  data: createProduct
): Promise<createProduct> => {
  try {
    const response = await apiClient.post<createProduct>(`products`, data);

    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error('Failed to Create Product');
  }
};

export const UpdateProduct = async (
  productId: string,
  data: updateProduct
): Promise<updateProduct> => {
  try {
    const response = await apiClient.patch<updateProduct>(
      `products:${productId}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error('Failed to update Product');
  }
};

