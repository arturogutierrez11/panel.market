export type GetProductsFilters = {
  page?: number;
  limit?: number;

  brand?: string;

  minPrice?: number;
  maxPrice?: number;

  minVisits?: number;
  maxVisits?: number;

  minOrders?: number;
  maxOrders?: number;

  orderBy?: 'visits' | 'price' | 'soldQuantity';
  direction?: 'asc' | 'desc';

  excludeMarketplace?: string; // "megatone,oncity"
};

export type ProductItem = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  seller_sku: string;
  soldQuantity: number;
  visits: number;
  isFavorite: boolean;
  isPublished: boolean;
  publishedMarketplaces: {
    price: number;
    stock: number;
    status: string;
    isActive: number;
    marketplace: string;
  }[];
};

export type ProductsResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  items: ProductItem[];
};

export interface IGetProductsRepository {
  execute(filters: GetProductsFilters): Promise<ProductsResponse>;
}