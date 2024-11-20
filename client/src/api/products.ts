import { ProductCardType } from "../interfaces/product";
import { apiClient } from "./apiClient";


export const getProductsCards = async (): Promise<ProductCardType[]> => {
    try {
        const response = await apiClient.get<ProductCardType[]>('products/cards')
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch products cards');
    }
}
