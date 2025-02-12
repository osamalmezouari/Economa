import { WishlistType } from '../types/wishlist';
import { apiClient } from '../utils/apiClient';

export const GetWishList = async (): Promise<WishlistType[]> => {
  try {
    const response = await apiClient.get('/wishlist/withproducts');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch wishList');
  }
};

export const createWishList = async (
  productId: string
): Promise<WishlistType> => {
  try {
    const response = await apiClient.post(`/wishlist`, {
      productId,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to add to wishList');
  }
};

export const removefromWishList = async (id: string): Promise<WishlistType> => {
  try {
    const response = await apiClient.delete(`/wishlist/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to remove from wishList');
  }
};
