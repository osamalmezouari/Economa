export interface StoreFilters {
  category?: string;
  search?: string;
  weight?: string;
  Maxprice?: number;
  Minprice?: number;
  page?: number;
  sort?:
    | ''
    | 'price-asc'
    | 'price-desc'
    | 'rating-asc'
    | 'rating-desc'
    | 'name-asc'
    | 'name-desc';
}
