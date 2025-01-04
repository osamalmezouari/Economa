import ProductDetails, {
  ProductCardType,
  ProductsNewArrivals,
  ProductStoreType,
} from '../types/product';
import { apiClient } from '../utils/apiClient';
import { StoreFilters } from '../types/storeFilters';

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
      throw error.response.data;
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
      throw error.response.data;
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
      throw error.response.data;
    }
    throw new Error('Failed to Fetch products New Arrivals');
  }
};


export const getProductsDetails = async (id: string): Promise<ProductDetails> => {
  try {
    const response = await apiClient.get<ProductDetails>(`products/productdetails/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to Fetch product details');
  }
}
