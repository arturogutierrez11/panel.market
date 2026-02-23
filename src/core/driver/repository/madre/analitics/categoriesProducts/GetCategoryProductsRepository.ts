import { IGetCategoryProductsRepository } from '@/src/core/adapters/repository/madre/analitics/IGetCategoryProductsRepository';
import { HttpClient } from '@/src/core/driver/repository/http/httpClient';

export type PublishedMarketplace = {
  marketplace: string;
  status: string;
  price: number;
  stock: number;
  isActive: number;
};

export type CategoryProduct = {
  id: string;
  title: string;
  thumbnail: string;

  seller_sku: string;

  price: number;
  soldQuantity: number;
  visits: number;
  revenue: number;

  isFavorite: boolean;
  isPublished: boolean;

  publishedMarketplaces: PublishedMarketplace[];
};

export type CategoryProductsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type CategoryProductsResponse = {
  meta: CategoryProductsMeta;
  items: CategoryProduct[];
};

export type CategoryProductsFilters = {
  minPrice?: string;
  maxPrice?: string;
  minVisits?: string;
  maxVisits?: string;
  minOrders?: string;
  maxOrders?: string;
  minRevenue?: string;
  maxRevenue?: string;
  excludeMarketplace?: string[]; 
};

export class GetCategoryProductsRepository
  implements IGetCategoryProductsRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

async execute(
  categoryId: string,
  page: number = 1,
  limit: number = 20,
  filters?: CategoryProductsFilters
): Promise<CategoryProductsResponse> {

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {

      if (!value || value === '' || value === undefined) return;

      // 🔥 Si es array (excludeMarketplace)
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.append(key, value.join(','));
        }
      } else {
        params.append(key, String(value));
      }

    });
  }

  return this.http.get<CategoryProductsResponse>(
    `/api/analytics/categories/${categoryId}/products?${params.toString()}`
  );
}
}