import ProductDetails, {
  ManageProductsFilters,
  ManageProductsResponse,
  ProductCardType,
  ProductsNewArrivals,
  ProductStoreType,
  StoreFilters,
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
    const params = new URLSearchParams();

    if (filters.page) {
      params.append('page', String(filters.page));
    } else {
      params.append('page', String(1));
    }
    if (filters.category) params.append('category', filters.category);
    if (filters.min_price)
      params.append('min_price', String(filters.min_price));
    if (filters.max_price)
      params.append('max_price', String(filters.max_price));
    if (filters.min_stock)
      params.append('min_stock', String(filters.min_stock));
    if (filters.max_stock)
      params.append('max_stock', String(filters.max_stock));

    const response = await apiClient.get<ManageProductsResponse>(
      `products/manageproductstable?${params.toString()}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch products data');
  }
};
