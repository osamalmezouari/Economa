import { ProductCardType, ProductsNewArrivals } from '../interfaces/product';
import { apiClient } from '../utils/apiClient';

export const getProductsCards = async (): Promise<ProductCardType[]> => {
  try {
    const response = await apiClient.get<ProductCardType[]>('products/cards');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products cards');
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
  } catch (error) {
    throw new Error('Failed to fetch new arrivals products');
  }
};
