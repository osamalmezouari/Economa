export interface ProductCardType {
  id: string;
  discount: string;
  name: string;
  categoryName: string;
  description: string;
  productAvgRaiting: number;
  price: string;
  priceWithDiscount: string;
  unit: string;
  imageLink: string;
}

export interface ProductCardStateType {
  productsCard: {
    data: ProductCardType[];
    loading: boolean;
    error: string;
  };
}
