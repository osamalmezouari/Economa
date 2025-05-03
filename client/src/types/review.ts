export interface Review {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
    avatar : string
  };
  productId: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
}

export interface AddReview {
  email: string;
  name: string;
  productId: string;
  rating: number;
  reviewText?: string;
}
