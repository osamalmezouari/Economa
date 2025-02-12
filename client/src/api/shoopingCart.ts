import { createShoppingCart, ShoopingCartType } from '../types/shoppingCart';
import { apiClient } from '../utils/apiClient';

export const shoppingCart = async (): Promise<ShoopingCartType[]> => {
  try {
    const response = await apiClient.get<ShoopingCartType[]>(
      '/shopping-cart/WithProducts'
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch shoppingCart');
  }
};

export const createshoppingCart = async (
  data: createShoppingCart
): Promise<createShoppingCart> => {
  try {
    const response = await apiClient.post<createShoppingCart>(
      '/shopping-cart',
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to create shoppingCart');
  }
};

export const updatequantityapi = async (id: string, quantity: number) => {
  try {
    const response = await apiClient.patch(`/shopping-cart/${id}`, {
      quantity,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to update quantity');
  }
};

export const removefromshoppingCart = async (id: string) => {
  try {
    const response = await apiClient.delete(`/shopping-cart/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to remove from shoppingCart');
  }
};
