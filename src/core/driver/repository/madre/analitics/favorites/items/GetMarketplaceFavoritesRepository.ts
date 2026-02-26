import { MarketplaceFavoriteProduct } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";
import { HttpClient } from "../../../../http/httpClient";
import { IGetMarketplaceFavoritesRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/items/getDetails/IGetMarketplaceFavoritesRepository";

export type FavoritesFilters = {
  brand?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  minVisits?: number;
  maxVisits?: number;
  minOrders?: number;
  maxOrders?: number;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'visits' | 'soldQuantity' | 'stock';
  sortOrder?: 'asc' | 'desc';
};

export type PaginatedFavoritesResponse = {
  data: MarketplaceFavoriteProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export class GetMarketplaceFavoritesRepository
  implements IGetMarketplaceFavoritesRepository
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
    marketplaceId: number,
    filters?: FavoritesFilters
  ): Promise<PaginatedFavoritesResponse> {

    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString()
      ? `?${params.toString()}`
      : '';

    const response = await this.http.get<any>(
      `/api/analytics/marketplace-favorites/${marketplaceId}/favorites${queryString}`
    );

    return {
      data: response.data.map((r: any) => ({
        id: r.id,
        title: r.title,
        thumbnail: r.thumbnail,
        price: Number(r.price),
        soldQuantity: Number(r.soldQuantity),
        stock: Number(r.stock ?? 0),
        visits: Number(r.visits ?? 0),
        brand: r.brand,
        categoryId: r.categoryId,
        seller_sku: r.seller_sku,
      })),
      pagination: response.pagination
    };
  }
}