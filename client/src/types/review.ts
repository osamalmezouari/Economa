
export default interface Review {
  id: string;
  user: {
    name : string
  };
  productId: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
}
