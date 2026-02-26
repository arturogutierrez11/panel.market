import { IRemoveMarketplaceFavoriteRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/items/delete/IRemoveMarketplaceFavoriteRepository";
import { HttpClient } from "@/src/core/driver/repository/http/httpClient";

export class RemoveMarketplaceFavoriteRepository
  implements IRemoveMarketplaceFavoriteRepository
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
    productId: string
  ): Promise<void> {
    await this.http.delete(
      `/api/analytics/marketplace-favorites/${marketplaceId}/products/${productId}`
    );
  }
}