import { IGetMarketplaceFavoritesRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IGetMarketplaceFavoritesRepository";
import { MarketplaceFavoriteProduct } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";
import { HttpClient } from "../../../http/httpClient";

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
    marketplaceId: number
  ): Promise<MarketplaceFavoriteProduct[]> {

    const rows = await this.http.get<any[]>(
      `/api/analytics/marketplace-favorites/${marketplaceId}/products`
    );

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      thumbnail: r.thumbnail,
      price: Number(r.price),
      soldQuantity: Number(r.soldQuantity),
      visits: Number(r.visits ?? 0),
      revenue: Number(r.revenue ?? 0),
      seller_sku: r.seller_sku,
      marketplaces: r.marketplaces ?? []
    }));
  }
}