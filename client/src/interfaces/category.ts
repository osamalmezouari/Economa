export interface CategoryType {
    id: string
    name: string
    svgLink: string
    description: string
    productsCount?: number
}

export interface CategoryStateType {
    categories: CategoryType[];
    loading: boolean;
    error: string | null;
}