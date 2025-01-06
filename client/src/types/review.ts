export interface Review {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  productId: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
}

export interface AddReview {
  email: string;
  mame: string;
  productId: string;
  rating: number;
  reviewText?: string;
}
